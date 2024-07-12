import React, { useRef, useEffect } from "react"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import "react-horizontal-scrolling-menu/dist/styles.css"
import "./projectCarousel.css"

import monoWebAppsPng from "../images/OdinMonoWebApps.png"
import selectionSortPng from "../images/SelectionSortAndVisualizer.png"
import machineLearningPng from "../images/BasicsOfMachineLearningAndVisualisation.png"
import predictiveAnalysisPng from "../images/BasicsOfPredictiveAnalysis.png"

const projectData = [
  {
    title: "Odin Mono Web Apps",
    description:
      "A collection of web-based projects created with React, TypeScript, and Redux.",
    link: "https://github.com/itkrivoshei/OdinMonoWebApps",
    image: monoWebAppsPng,
  },
  {
    title: "Selection Sort Visualizer",
    description:
      "An interactive way to learn Selection Sort with visual tests.",
    link: "https://github.com/itkrivoshei/SelectionSortAndVisualizer",
    image: selectionSortPng,
  },
  {
    title: "Machine Learning And Visualisation",
    description:
      "Predict salaries based on years of experience using linear regression.",
    link: "https://github.com/itkrivoshei/BasicsOfMachineLearningAndVisualisation",
    image: machineLearningPng,
  },
  {
    title: "Predictive Analysis",
    description:
      "Predict rental prices and classify luxury apartments in Berlin.",
    link: "https://github.com/itkrivoshei/BasicsOfPredictiveAnalysis",
    image: predictiveAnalysisPng,
  },
]

const Arrow = ({ text, className, onClick }) => {
  return (
    <div className={`arrow ${className}`} onClick={onClick}>
      {text}
    </div>
  )
}

const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext)

  return <Arrow className="left-arrow" onClick={() => scrollPrev()} />
}

const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext)

  return <Arrow className="right-arrow" onClick={() => scrollNext()} />
}

const ProjectCarousel = () => {
  const apiRef = useRef(null)

  useEffect(() => {
    const scrollContainer = apiRef.current?.scrollContainer

    const handleScroll = () => {
      if (!scrollContainer) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
      const maxScrollLeft = scrollWidth - clientWidth

      if (scrollLeft <= 0) {
        scrollContainer.scrollLeft = maxScrollLeft - clientWidth
      } else if (scrollLeft >= maxScrollLeft) {
        scrollContainer.scrollLeft = clientWidth
      }
    }

    scrollContainer?.addEventListener("scroll", handleScroll)
    return () => scrollContainer?.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="project-carousel-wrapper">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} ref={apiRef}>
        {projectData.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item"
          >
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </a>
        ))}
      </ScrollMenu>
    </div>
  )
}

export default ProjectCarousel
