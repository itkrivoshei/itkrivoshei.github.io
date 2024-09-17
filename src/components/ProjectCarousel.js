import React, { useRef, useState } from "react"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import "react-horizontal-scrolling-menu/dist/styles.css"
import "./projectCarousel.css"
import { projectData } from "./projectData"

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
  const clickTimeout = useRef(null)

  const isItemSelected = id => !!selected.find(el => el === id)

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

  const handleCardClick = link => {
    if (!dragState.current.dragging) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = setTimeout(() => {
        window.open(link, "_blank")
      }, 200)
    }
  }

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
          <ProjectCard
            key={index}
            itemId={index.toString()}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            link={project.link}
            onClick={() => handleCardClick(project.link)}
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

function ProjectCard({ title, description, image, tags, link, onClick }) {
  return (
    <div className="project">
      <div className="header">
        <div className="title">{title}</div>
      </div>
      <div className="info" onClick={onClick}>
        <img className="image" src={image} alt={title} draggable="false" />
        <div className="description-container">
          <div className="description">{description}</div>
          <div className="description-tag">
            <div className="tags" aria-hidden="true">
              {tags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
    }}
  >
    {children}
  </button>
)

export default ProjectCarousel
