import React from "react"

const HeadingAbout = ({ subtitle, title }) => {
  return (
    <>
      <div id='heading'>
        <h3 style={{"color":"#D7A20B"}}>{subtitle} </h3>
        <h1 style={{"color":"#152137"}}>{title} </h1>
      </div>
    </>
  )
}

export default HeadingAbout
