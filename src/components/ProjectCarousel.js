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
    this.position = ev.clientX || ev.touches[0].clientX
    this.clicked = true
  }

  dragStop = () => {
    window.requestAnimationFrame(() => {
      this.dragging = false
      this.clicked = false
    })
  }

  dragMove = (ev, cb) => {
    const clientX = ev.clientX || ev.touches[0].clientX
    const newDiff = this.position - clientX
    const movedEnough = Math.abs(newDiff) > 5

    if (this.clicked && movedEnough) {
      this.dragging = true
    }

    if (this.dragging && movedEnough) {
      this.position = clientX
      cb(newDiff)
    }
  }
}

const ProjectCarousel = () => {
  const [selected] = useState([])
  const dragState = useRef(new DragDealer())
  const clickTimeout = useRef(null)
  const apiRef = useRef(null) // Using apiRef for scroll functions
  const [isFirstVisible, setIsFirstVisible] = useState(true)
  const [isLastVisible, setIsLastVisible] = useState(false)

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

  const onInit = visibility => {
    setIsFirstVisible(visibility.isFirstItemVisible)
    setIsLastVisible(visibility.isLastItemVisible)
  }

  const onUpdate = visibility => {
    setIsFirstVisible(visibility.isFirstItemVisible)
    setIsLastVisible(visibility.isLastItemVisible)
  }

  return (
    <div
      className="no-scrollbar project-carousel-wrapper"
      onMouseLeave={dragState.current.dragStop}
    >
      <ScrollMenu
        LeftArrow={<LeftArrow disabled={isFirstVisible} />}
        RightArrow={<RightArrow disabled={isLastVisible} />}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={handleDrag}
        onInit={onInit}
        onUpdate={onUpdate}
        apiRef={apiRef} // Pass apiRef here
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

const LeftArrow = ({ disabled }) => {
  const { scrollPrev } = React.useContext(VisibilityContext)
  return (
    <Arrow
      disabled={disabled}
      onClick={() => !disabled && scrollPrev()}
      className="left-arrow"
    >
      {"<"}
    </Arrow>
  )
}

const RightArrow = ({ disabled }) => {
  const { scrollNext } = React.useContext(VisibilityContext)
  return (
    <Arrow
      disabled={disabled}
      onClick={() => !disabled && scrollNext()}
      className="right-arrow"
    >
      {">"}
    </Arrow>
  )
}

function ProjectCard({ title, description, image, tags, onClick }) {
  return (
    <div className="project">
      <div className="header">
        <div className="title">{title}</div>
      </div>
      <div
        className="info"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && onClick(e)}
      >
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
