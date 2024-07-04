import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GeneralInfo from "../components/GeneralInfo"
import Timeline from "../components/Timeline"
import ProjectCarousel from "../components/ProjectCarousel"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GeneralInfo />
    <Timeline />
    <ProjectCarousel />
  </Layout>
)

export default IndexPage
