import React, { useState, useEffect } from "react"
import "./generalInfo.css"
import profilePhoto from "../images/profilePhoto.jpg"

const GeneralInfo = () => {
  const [displayText, setDisplayText] = useState([])
  const texts = [
    { type: "command", content: "// whoami\n" },
    { type: "text", content: "Nikita Krivoshei\n" },
    { type: "text", content: "Front-End Engineer & Marathon Runner\n\n" },
    { type: "command", content: "// links\n" },
    {
      type: "link",
      content: "GitHub\n",
      href: "https://github.com/itkrivoshei",
    },
    {
      type: "link",
      content: "LinkedIn\n",
      href: "https://www.linkedin.com/in/itkivoshei/",
    },
    {
      type: "link",
      content: "Mail",
      href: "mailto:nikitakrivoshei@gmail.com",
    },
  ]

  useEffect(() => {
    let textIndex = 0
    let charIndex = 0

    const interval = setInterval(() => {
      setDisplayText(prev => {
        const newDisplayText = [...prev]
        if (charIndex < texts[textIndex].content.length) {
          charIndex++
          newDisplayText[textIndex] =
            (newDisplayText[textIndex] || "") +
            texts[textIndex].content.charAt(charIndex - 1)
        } else {
          if (textIndex < texts.length - 1) {
            textIndex++
            charIndex = 0
            newDisplayText.push("")
          } else {
            clearInterval(interval)
          }
        }
        return newDisplayText
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="general-info">
      <div className="terminal-window">
        <div className="terminal-body">
          <div className="profile-section">
            <img
              src={profilePhoto}
              alt="Nikita Krivoshei"
              className="profile-photo"
            />
            <div>
              <pre className="typed-text">
                {displayText.map((line, index) => {
                  if (texts[index].type === "link") {
                    return (
                      <a
                        key={index}
                        href={texts[index].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#bd93f9" }}
                      >
                        {line}
                      </a>
                    )
                  } else if (texts[index].type === "command") {
                    return (
                      <span key={index} className="command">
                        {line}
                      </span>
                    )
                  } else {
                    return <span key={index}>{line}</span>
                  }
                })}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GeneralInfo
