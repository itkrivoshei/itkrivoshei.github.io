import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GeneralInfo from "../components/GeneralInfo"
import Timeline from "../components/Timeline"
import ProjectCarousel from "../components/ProjectCarousel"
import "./index.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="full-width-section" id="general-info">
      <GeneralInfo />
    </div>
    <div className="section" id="timeline">
      <Timeline />
    </div>
    <div className="section" id="projects">
      <ProjectCarousel />
    </div>
  </Layout>
)

export default IndexPage
