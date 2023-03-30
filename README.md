# Dinos Marketplace

Welcome to `Dinos Marketplace`! This README.md file provides you with instructions on how to set up, run, and access the application, as well as an overview of the project's design.

## URL to application

[Dinos Marketplace](https://dinos-marketplace-react.uw.r.appspot.com/)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  
- [Application URL](#application-url)
- [Design of the Project](#design-of-the-project)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow the instructions below to set up and run the application on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= v14.0.0)
- [npm](https://www.npmjs.com/) (>= v6.0.0)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/arrushigupta/SENG401-FinalProject.git
```

### Running the Application

1. Installation & Run the application:

How to run it locally:

```bash
cd Client
npm install
npm start
```

create sendgrid.env file in the Server folder
put

```bash
export SENDGRID_API_KEY='{YOUR_API_KEY}'
```

in the sendgrid.env file.

```bash
cd Server
npm install
sh run.sh
```

## Application URL

[Dinos Marketplace](https://dinos-marketplace-react.uw.r.appspot.com/)

## Design of the Project

1. Data privacy: Data is kept private by encrypting sensitive user information
2. Ease of use: The application is very easy to use, with an intuitive GUI and helpful text prompts throughout the application. The app requires minimal training, so anyone can use it.
3. Aesthetic: GUI interface was designed using tailwind, which is a css library specific to the React frontend framework. This allowed for components with similar elements throughout the application
4. Accessibility: our application can be accessed from anywhere in the world, with minimal downtime. This is possible since we are hosting our database and server on the cloud.
5. Two factor authentication: Email verification in order to ensure users are creating accounts with their own emails, and users are who they say they are.

### Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

### License

[MIT](https://choosealicense.com/licenses/mit/)
