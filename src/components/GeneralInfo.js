import React from "react"
import "./generalInfo.css"
import profilePhoto from "../images/profilePhoto.jpg"

const GeneralInfo = () => {
  return (
    <section className="general-info">
      {/* Profile Photo */}
      {/* <img
        src={profilePhoto}
        alt="Nikita Krivoshei"
        className="profile-photo"
      /> */}

      {/* Main Info */}
      <div className="info-container">
        <h1 className="name">Nikita Krivoshei</h1>
        <h3 className="title">Front-End Engineer</h3>
      </div>

      {/* Links and Resume */}
      <div className="links">
        <p>
          Find me on:
          <a
            href="https://www.linkedin.com/in/itkivoshei/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          and
          <a
            href="https://github.com/itkrivoshei"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          <a
            href="https://drive.google.com/file/d/1qTOYft9_fMY25XVUD5Ce2_P6yWD8a48_/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download My Resume
          </a>
        </p>
      </div>
    </section>
  )
}

export default GeneralInfo
