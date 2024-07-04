import React from "react"
import { Link } from "gatsby"
import "./generalInfo.css"

const GeneralInfo = () => (
  <div className="general-info">
    <h1>Nikita Krivoshei</h1>
    <h2>Front-End Developer</h2>
    <ul>
      <li>
        <Link to="https://github.com/itkrivoshei">GitHub</Link>
      </li>
      <li>
        <Link to="https://www.linkedin.com/in/itkivoshei/">LinkedIn</Link>
      </li>
      <li>
        <Link to="mailto:nikitakrivoshei@gmail.com">
          nikitakrivoshei@gmail.com
        </Link>
      </li>
    </ul>
  </div>
)

export default GeneralInfo
