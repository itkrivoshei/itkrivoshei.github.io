import React from "react"
import "./timeline.css"

const timelineData = [
  {
    date: "Sep 2023 - Present",
    company: "SPRYLAB",
    location: "Berlin, Germany",
    title: "Front-End Developer",
  },
  {
    date: "Dec 2022 - Present",
    company: "The Odin Project",
    location: "Berlin, Germany",
    title: "Full-Stack Front-End Developer",
  },
  {
    date: "Sep 2021 - Apr 2022",
    company: "RTLabs",
    location: "Moscow, Russia",
    title: "Angular Front-End Developer (Main Team)",
  },
  {
    date: "Apr 2021 - Sep 2021",
    company: "RTLabs",
    location: "Moscow, Russia",
    title: "Angular Front-End Developer (Content Team)",
  },
  {
    date: "Oct 2020 - Apr 2021",
    company: "RTLabs",
    location: "Moscow, Russia",
    title: "Intern Angular Front-End Developer",
  },
  {
    date: "Jan 2019 - Dec 2019",
    company: "FirstBIT",
    location: "Sochi, Russia",
    title: "Software Database Developer",
  },
]

const Timeline = () => (
  <div className="timeline">
    {timelineData.map((item, index) => (
      <div key={index} className="timeline-item">
        <div className="timeline-item-title">{item.title}</div>
        <div className="timeline-item-company">{item.company}</div>
        <div className="timeline-item-date">{item.date}</div>
        <div className="timeline-item-location">{item.location}</div>
      </div>
    ))}
  </div>
)

export default Timeline
