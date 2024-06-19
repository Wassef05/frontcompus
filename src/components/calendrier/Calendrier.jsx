import React from 'react';
import './calendrier.css'; 
import Back from '../common/back/Back';
const Calendrier = () => {
  
  const calendrierData = [
    { designation: 'Start of Classes Semester 1', date: 'Monday 18 May 2024' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },
    { designation: 'Total Duration of Courses', date: '14 Weeks' },

  ];

  return (
    <>
    
    <Back title='Calendar' />



    <div className="calendrier-container">
        
      <div className="calendrier-header">
      <div className="header-content">
      <div className="header-line"></div>
       
        
          <span className="header-title" >EDUCONNECT</span>
          <div className="header-dot"></div>
         
    </div>
        <h1 className="header-main-title" >CALENDRIER -<br />EDUCONNECT</h1>
      </div>

      <table className="calendrier-table">
        <thead>
        <tr>
    <th colSpan="2">Academic Calendar </th> 
  </tr>
            
          <tr>
            <th>DESIGNATION</th>
            <th>Bachelor's degree / Engineering curriculum.</th>
           
          </tr>
        </thead>
        <tbody>
          {calendrierData.map((item, index) => (
            <tr key={index}>
              <td>{item.designation}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="calendrier-note">
    NB : This schedule is provisional (it may change from time to time, please check it periodically).
  </div>
    </div>
    </>
  );
};

export default Calendrier;
