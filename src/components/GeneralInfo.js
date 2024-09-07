import React from "react"
import "./generalInfo.css"
import profilePhoto from "../images/profilePhoto.jpg"

const GeneralInfo = () => {
  return (
    <section className="general-info">
      <img
        src={profilePhoto}
        alt="Nikita Krivoshei"
        className="profile-photo"
      />
      <div>
        <h1>Nikita Krivoshei</h1>
        <h3>Front-End Engineer</h3>
      </div>
    </section>
  )
}

export default GeneralInfo
