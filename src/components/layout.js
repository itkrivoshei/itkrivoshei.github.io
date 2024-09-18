import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          minHeight: `100vh`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
