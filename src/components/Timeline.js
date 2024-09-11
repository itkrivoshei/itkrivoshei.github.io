import React, { useEffect } from "react"
import "./timeline.css"

const calculateDuration = (start, end) => {
  const startDate = new Date(start)
  const endDate = end === "Present" ? new Date() : new Date(end)
  const diffInMs = endDate - startDate
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365)
  return `${diffInYears.toFixed(1)}`
}

const formatDate = dateStr => {
  const options = { year: "numeric", month: "short" }
  return new Date(dateStr).toLocaleDateString("en-US", options)
}

const timelineData = [
  {
    start: "2023-09-01",
    end: "Present",
    company: "SPRYLAB (Purple)",
    location: "Berlin, Germany",
    title: "Frontend Developer",
    link: "https://www.linkedin.com/company/2979477/",
  },
  {
    start: "2022-12-01",
    end: "2023-09-01",
    company: "The Odin Project",
    location: "Berlin, Germany",
    title: "Fullstack Frontend Developer Course",
    link: "https://www.linkedin.com/company/the-odin-project/posts/?feedView=all",
  },
  {
    company: "RTLabs",
    link: "https://www.linkedin.com/company/ао-рт-лабс-/",
    roles: [
      {
        start: "2021-09-01",
        end: "2022-04-01",
        title: "Angular Frontend Developer (Main Team)",
        location: "Moscow, Russia",
      },
      {
        start: "2021-04-01",
        end: "2021-09-01",
        title: "Angular Frontend Developer (Content Team)",
        location: "Moscow, Russia",
      },
      {
        start: "2020-10-01",
        end: "2021-04-01",
        title: "Intern Angular Frontend Developer",
        location: "Moscow, Russia",
      },
    ],
  },
  {
    start: "2019-01-01",
    end: "2019-12-31",
    company: "FirstBIT",
    location: "Sochi, Russia",
    title: "Software Database Developer",
    link: "https://www.linkedin.com/company/-1-/",
  },
]

const Timeline = () => {
  const totalExperience = timelineData
    .reduce((acc, item) => {
      if (item.roles) {
        return (
          acc +
          item.roles.reduce(
            (roleAcc, role) =>
              roleAcc + parseFloat(calculateDuration(role.start, role.end)),
            0,
          )
        )
      }
      return acc + parseFloat(calculateDuration(item.start, item.end))
    }, 0)
    .toFixed(1)

  return (
    <section className="timeline-outer-container">
      <div className="about-me">
        <h1># about</h1>
        <p>
          With over <span className="highlight">{totalExperience} years</span>{" "}
          of experience, I build user-friendly web applications, mentor junior
          developers, and improve team workflows in agile environments. I'm
          detail-oriented, adaptable, and focused on delivering high-quality
          results.
        </p>
      </div>
      <div className="timeline-container">
        <ul className="timeline">
          {timelineData.map((item, index) => (
            <li
              key={index}
              className="timeline-item"
              onClick={() =>
                window.open(item.link || item.roles[0].link, "_blank")
              }
            >
              <span>
                <div className="timeline-duration">
                  {item.roles
                    ? item.roles
                        .map(role => calculateDuration(role.start, role.end))
                        .reduce((acc, val) => acc + parseFloat(val), 0)
                        .toFixed(1)
                    : calculateDuration(item.start, item.end)}{" "}
                  <br />
                  yrs
                </div>
              </span>
              <span className="timeline-dot"></span>
              {item.roles ? (
                <div className="timeline-content">
                  <div className="timeline-company-wrapper">
                    <a
                      href={item.link}
                      className="timeline-company"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.company}
                    </a>
                  </div>
                  {item.roles.map((role, idx) => (
                    <div key={idx} className="timeline-role">
                      <div className="timeline-title">{role.title}</div>
                      <div className="timeline-date">
                        {formatDate(role.start)} -{" "}
                        {role.end === "Present"
                          ? "Present"
                          : formatDate(role.end)}
                      </div>
                      <div className="timeline-location">{role.location}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="timeline-content">
                  <div className="timeline-company-wrapper">
                    <a
                      href={item.link}
                      className="timeline-company"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.company}
                    </a>
                  </div>
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-date">
                    {formatDate(item.start)} -{" "}
                    {item.end === "Present" ? "Present" : formatDate(item.end)}
                  </div>
                  <div className="timeline-location">{item.location}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Timeline
