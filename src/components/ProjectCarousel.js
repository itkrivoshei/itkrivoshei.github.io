import React, { useRef, useState } from "react"
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

class DragDealer {
  clicked = false
  dragging = false
  position = 0

  dragStart = ev => {
    this.position = ev.clientX
    this.clicked = true
  }

  dragStop = () => {
    window.requestAnimationFrame(() => {
      this.dragging = false
      this.clicked = false
    })
  }

  dragMove = (ev, cb) => {
    const newDiff = this.position - ev.clientX
    const movedEnough = Math.abs(newDiff) > 5

    if (this.clicked && movedEnough) {
      this.dragging = true
    }

    if (this.dragging && movedEnough) {
      this.position = ev.clientX
      cb(newDiff)
    }
  }
}

const ProjectCarousel = () => {
  const [selected, setSelected] = useState([])
  const dragState = useRef(new DragDealer())

  const isItemSelected = id => !!selected.find(el => el === id)

  const handleClick =
    id =>
    ({ getItemById, scrollToItem }) => {
      if (dragState.current.dragging) return

      const itemSelected = isItemSelected(id)
      setSelected(currentSelected =>
        itemSelected
          ? currentSelected.filter(el => el !== id)
          : currentSelected.concat(id),
      )
    }

  const handleDrag =
    ({ scrollContainer }) =>
    ev =>
      dragState.current.dragMove(ev, posDiff => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff
        }
      })

  const onMouseDown = React.useCallback(
    () => dragState.current.dragStart,
    [dragState],
  )
  const onMouseUp = React.useCallback(
    () => dragState.current.dragStop,
    [dragState],
  )

  return (
    <div
      className="no-scrollbar project-carousel-wrapper"
      onMouseLeave={dragState.current.dragStop}
    >
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={handleDrag}
      >
        {projectData.map((project, index) => (
          <Card
            key={index}
            itemId={index.toString()}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
            onClick={handleClick(index.toString())}
            selected={isItemSelected(index.toString())}
          />
        ))}
      </ScrollMenu>
    </div>
  )
}

const LeftArrow = () => {
  const visibility = React.useContext(VisibilityContext)
  const isFirstItemVisible = visibility.useIsVisible("first", true)

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={() => visibility.scrollPrev("smooth")}
      className="left-arrow"
    >
      {"<"}
    </Arrow>
  )
}

const RightArrow = () => {
  const visibility = React.useContext(VisibilityContext)
  const isLastItemVisible = visibility.useIsVisible("last", false)

  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={() => visibility.scrollNext("smooth")}
      className="right-arrow"
    >
      {">"}
    </Arrow>
  )
}

function Card({ onClick, title, description, image, link }) {
  const visibility = React.useContext(VisibilityContext)

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: "100%",
        cursor: "pointer",
        margin: "0 10px",
        userSelect: "none",
      }}
      tabIndex={0}
    >
      <h3>// {title}</h3>
      <img
        src={image}
        alt={title}
        draggable="false"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "16 / 9",
          objectFit: "cover",
          border: "3px solid #50fa7b",
        }}
      />
      <p>{description}</p>
    </div>
  )
}

const Arrow = ({ children, disabled, onClick, className }) => (
  <button
    className={className + " arrow"}
    onClick={onClick}
    disabled={disabled}
    style={{
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0 : 1,
      display: "absolute",
    }}
  >
    {children}
  </button>
)

export default ProjectCarousel
