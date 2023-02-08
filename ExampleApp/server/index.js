/** 
 * CPSC 471 FINAL PROJECT
 * BACKEND SERVER
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const moment = require('moment');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3001;


// SQL DETAILS -- PRIVATE
const connection = mysql.createConnection({
    host: '35.183.16.214',
    user: '471Project',
    password: 'FinalProject471#',
    database: '471Project',
});

connection.connect();

const sqlQuery = (sql, args, callback) => {
    connection.query(sql, args, (err, rows, fields) => {
        if (err) {
            console.error("ERRRR", err);
            callback(null, err);
            // res.status(500).send('Error');
        } else {
            //Return ALl Good
            console.log("SQL Response", rows[0]);
            callback({ rows: rows, fields: fields }, null);

        }

    });
};

// ALL GET(Load) FUNCTIONS

app.get('/list-doctors', (req, res) => {
    const sql = "SELECT Email as id, CONCAT('Dr. ', FirstName, + ' ', LastName) AS name FROM User WHERE UserType = 'Doctor'";
    sqlQuery(sql, [], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.get('/list-clinics', (req, res) => {
    const sql = "SELECT ClinicID AS id, Name AS name FROM Clinic";
    sqlQuery(sql, [], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.get('/get-user-info', (req, res) => {
    const sql = "SELECT DISTINCT * FROM User WHERE Email = ? || PatientRecord = ?";
    sqlQuery(sql, [req.query.userId, req.query.userId], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows[0]);
        }
    });
});

app.get('/get-appointments-by-doctor', (req, res) => {
    const sql = "SELECT *, D.FirstName AS df, D.LastName AS dl FROM Appointment INNER JOIN User as D ON Appointment.DoctorID = D.email INNER JOIN User as P ON Appointment.PatientID = P.email INNER JOIN Clinic ON Clinic.ClinicID = Appointment.Clinic WHERE DoctorID = ?";
    sqlQuery(sql, [req.query.userId], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});

app.get('/get-appointments-by-patient', (req, res) => {
    const sql = "SELECT *, D.FirstName AS df, D.LastName AS dl FROM Appointment INNER JOIN User as D ON Appointment.DoctorID = D.email INNER JOIN User as P ON Appointment.PatientID = P.email INNER JOIN Clinic ON Clinic.ClinicID = Appointment.Clinic WHERE PatientID = ?";
    sqlQuery(sql, [req.query.userId], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});
app.get('/get-appointement', (req, res) => {
    const sql = "SELECT * FROM Appointment WHERE ID = ?";
    sqlQuery(sql, [req.query.appointmentId], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});

app.get('/get-questionnaire', (req, res) => {
    const sql = "SELECT * FROM PatientQuestionnaire WHERE AppointmentID = ?";
    sqlQuery(sql, [req.query.appointmentId], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});

app.get('/get-patient-record', (req, res) => {
    const sql = "SELECT * FROM PatientRecord WHERE HealthCareNumber = ?";
    sqlQuery(sql, [req.query.healthCareNumber], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});

app.get('/get-patient-medications', (req, res) => {
    const sql = "SELECT * FROM Medication INNER JOIN Medication_Patient ON Medication.MedID = Medication_Patient.MedID WHERE PatientID = ?";
    sqlQuery(sql, [req.query.healthCareNumber], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});

app.get('/get-patient-diagnosis', (req, res) => {
    const sql = "SELECT * FROM Diagnosis INNER JOIN User ON User.Email = Diagnosis.DoctorID WHERE HealthCareNumber = ?";
    sqlQuery(sql, [req.query.healthCareNumber], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});
app.get('/get-patient-notes', (req, res) => {
    const sql = "SELECT * FROM PreviousNote INNER JOIN User ON User.Email = PreviousNote.DoctorID WHERE PreviousNote.HealthCareNumber = ?";
    sqlQuery(sql, [req.query.healthCareNumber], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});

app.get('/list-all-medications', (req, res) => {
    const sql = "SELECT * FROM Medication";
    sqlQuery(sql, [], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });
});


// ALL POST(Insert/Update) FUNCTIONS

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM User WHERE Email = ? AND Password = ?;";
    sqlQuery(sql, [req.body.username, req.body.password], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });


});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO User (Email, Password, PatientRecord) VALUES(?,?,?) ;";
    sqlQuery(sql, [req.body.username, req.body.password, req.body.hcn], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });


});


app.post('/create-appointement', (req, res) => {
    console.log(req);
    const sql = "INSERT INTO Appointment (DoctorID, PatientID, Clinic, Duration, DateTime) VALUES (?, ?, ?, ?, ?)";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.doctor, req.body.patientID, req.body.clinic, '15 mins', datetime], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.post('/create-medication', (req, res) => {
    console.log(req);
    const sql = "INSERT INTO Medication (Delivery, Brand, Type, Description) VALUES (?, ?, ?, ?)";
    // Perform SQL query
    sqlQuery(sql, [req.body.Delivery, req.body.Brand, req.body.Type, req.body.Description], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.post('/update-user-info', (req, res) => {
    console.log(req);
    const sql = "UPDATE User SET Address=?, PhoneNumber=?, FirstName=?, LastName=? WHERE Email = ? || PatientRecord = ?";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.Address, req.body.PhoneNumber, req.body.FirstName, req.body.LastName, req.body.Email, req.body.PatientRecord], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});


app.post('/update-medication', (req, res) => {
    console.log(req);
    const sql = "UPDATE Medication SET Delivery= ?, Brand=?, Type=?, Description=? WHERE MedID = ?";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.Delivery, req.body.Brand, req.body.Type, req.body.Description, req.body.MedID], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.post('/create-questionnaire', (req, res) => {
    console.log(req);
    const sql = "INSERT INTO PatientQuestionnaire (Covid, PrimaryConcern, OtherNotes, AppointmentID) VALUES (?, ?, ?, ?)";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.covid, req.body.primaryConcern, req.body.otherNotes, req.body.appointmentID], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.post('/create-patient-diagnosis', (req, res) => {
    console.log(req);
    const sql = "INSERT INTO Diagnosis (Comments, Name, HealthCareNumber, DoctorID) VALUES (?, ?, ?, ?)";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.comments, req.body.name, req.body.healthCareNumber, req.body.doctorID], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});


app.post('/create-patient-notes', (req, res) => {
    console.log(req);
    const sql = "INSERT INTO PreviousNote (Cure, Ailment, Duration, HealthCareNumber, DoctorID) VALUES (?, ?, ?, ?, ?)";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.cure, req.body.ailment, req.body.duration, req.body.healthCareNumber, req.body.doctorID], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.post('/create-patient-medication', (req, res) => {
    console.log(req);
    const sql = "INSERT INTO Medication_Patient (MedID, PatientID) VALUES (?, ?)";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.MedID, req.body.healthCareNumber], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.post('/delete-patient-medication', (req, res) => {
    console.log(req);
    const sql = "DELETE FROM Medication_Patient WHERE MedID = ? AND PatientID = ? ";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.MedId, req.body.healthCareNumber], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

app.post('/delete-medication', (req, res) => {
    console.log(req);
    const sql = "DELETE FROM Medication WHERE MedID = ?";
    // Perform SQL query
    const datetime = moment(req.body.date + " " + req.body.time).toDate();
    console.log(datetime);
    sqlQuery(sql, [req.body.MedId], (result, err) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.send(result.rows);
        }
    });

});

//Start Server
app.listen(port, () => {
    console.log(`471 Backend listening on Port ${port}`)
})