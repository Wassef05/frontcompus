import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1 style={{"color":"#D7A20B"}}>EDUCONNECT</h1>
            {/* <img src={logo} alt='Campus Connect Logo' style={{ height: '50px' }} /> Ajustez le style selon vos besoins */}

            <span>EDUCATION & LEARNING</span>
          </div>

          <div className='social flex'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
