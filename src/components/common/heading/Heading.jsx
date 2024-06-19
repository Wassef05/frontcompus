import React from "react"

const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div id='heading'>
        <h3>{subtitle} </h3>
        <h1 style={{"color":"#D7A20B"}}>{title} </h1>
      </div>
    </>
  )
}

export default Heading
