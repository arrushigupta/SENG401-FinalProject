import React from 'react';
import { FaBell } from 'react-icons/fa';
import styled from 'styled-components'

const NotificationIcon = ({ currentContact, index }) => {
    // console.log(count)
    return (

        <Container>

            <div className="notification-container">
                <i className="fa fa-bell notification-icon" />
                {/* <FaBell size={12} /> */}
                {currentContact && currentContact[index] && currentContact[index].unreadCount &&
                    <span className="notification-badge">
                        {currentContact[index].unreadCount}
                    </span>
                }
            </div>
        </Container>

    );
};




export default NotificationIcon;

const Container = styled.div`
.notification-container {
    
    margin-right: 0px;
    position: relative;
    left: 0px;
    top: 0px;
    right: 0px;
  }
  
  .notification-icon {
    font-size: 24px;
  }
  
  .notification-badge {
    
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: bold;
  }
`




