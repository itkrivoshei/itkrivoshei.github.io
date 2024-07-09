import React from "react"
import "./generalInfo.css"

const GeneralInfo = () => (
  <div className="general-info">
    <h1>Nikita Krivoshei</h1>
    <h2>Front-End Developer</h2>
    <ul>
      <li>
        <a
          href="https://github.com/itkrivoshei"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/itkivoshei/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <a href="mailto:nikitakrivoshei@gmail.com">nikitakrivoshei@gmail.com</a>
      </li>
    </ul>
  </div>
)

export default GeneralInfo
