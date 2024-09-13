import React from "react"
import "./generalInfo.css"
import profilePhoto from "../images/profilePhoto.jpg"

const GeneralInfo = () => {
  return (
    <section className="general-info">
      {/* <img
        src={profilePhoto}
        alt="Nikita Krivoshei"
        className="profile-photo"
      /> */}
      <div className="info-container">
        <h1 className="name">Nikita Krivoshei</h1>
        <h3 className="title">Frontend Engineer</h3>
      </div>
      <div className="links">
        <p>
          <a
            href="https://www.linkedin.com/in/itkivoshei/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          &nbsp;
          <a
            href="https://github.com/itkrivoshei"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          &nbsp;
          <a
            href="https://drive.google.com/file/d/1qTOYft9_fMY25XVUD5Ce2_P6yWD8a48_/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </p>
      </div>
    </section>
  )
}

export default GeneralInfo
