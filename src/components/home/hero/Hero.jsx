import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO CAMPUS' title='Best Education Expertise' />
            <p>Far far away, behind the word mountains, far from the countries Consonantia, there live the blind texts.</p>
            <div className='button'>
              <button className='primary-btn' style={{"backgroundColor":"#152137","color":"darkgoldenrod"}}>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button style={{"backgroundColor":"#D7A20B","color":"#152137"}}>
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
