import React from 'react';
import "./Users.css";

export const UsersErrors = ({userError}) =>
  <div className='userErrors'>
    {Object.keys(userError).map((fieldName, i) => {
      if(userError[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {userError[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>