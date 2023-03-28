import React from 'react';
import { FaBell } from 'react-icons/fa';
import styled from 'styled-components'

const NotificationIcon = ({ currentContact, index }) => {
    // console.log(count)
    return (

        <div>

            <div className="relative">
                
                {currentContact && currentContact[index] && currentContact[index].unreadCount &&
                    <span className="inline-block bg-red-500 group-focus:bg-white text-white text-sm font-semibold rounded-full px-2 py-1">
                        {currentContact[index].unreadCount}
                    </span>
                }
            </div>
        </div>

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




