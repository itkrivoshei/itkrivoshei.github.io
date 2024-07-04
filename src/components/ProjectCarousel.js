import React from "react"
import Slider from "react-slick"
import "./projectCarousel.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Importing example GIFs
import exampleGif1 from "../images/OdinMonoWebApps.gif"
import exampleGif2 from "../images/SelectionSortAndVisualizer.gif"
import exampleGif3 from "../images/BasicsOfPredictiveAnalysis.gif"

const projectData = [
  {
    title: "Project One",
    description: "Description of Project One",
    link: "https://github.com/yourprofile/project-one",
    image: exampleGif1,
  },
  {
    title: "Project Two",
    description: "Description of Project Two",
    link: "https://github.com/yourprofile/project-two",
    image: exampleGif2,
  },
  {
    title: "Project Three",
    description: "Description of Project Three",
    link: "https://github.com/yourprofile/project-three",
    image: exampleGif3,
  },
]

const ProjectCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  }

  return (
    <Slider {...settings} className="project-carousel">
      {projectData.map((project, index) => (
        <div key={index} className="project-item">
          <img src={project.image} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      ))}
    </Slider>
  )
}

export default ProjectCarousel
