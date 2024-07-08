const fs = require("fs")
const path = require("path")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

/**
 * @type {import('gatsby').GatsbyNode['onPostBuild']}
 */
exports.onPostBuild = () => {
  const source = path.join(__dirname, "CNAME")
  const destination = path.join(__dirname, "public", "CNAME")

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination)
    console.log("CNAME file copied to public directory")
  } else {
    console.error("CNAME file does not exist in the root directory")
  }
}
