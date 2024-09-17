import Optima1 from "../images/Optima1.jpg"
import Optima2 from "../images/Optima2.jpg"
import Odin1 from "../images/Odin1.jpg"
import Odin2 from "../images/Odin2.jpg"
import Weather1 from "../images/Weather1.jpg"
import Weather2 from "../images/Weather2.jpg"
import Todo1 from "../images/Todo1.jpg"
import Todo2 from "../images/Todo2.jpg"
import Calc1 from "../images/Calc1.jpg"
import Calc2 from "../images/Calc2.jpg"
import Form1 from "../images/Form1.jpg"
import Form2 from "../images/Form2.jpg"
import Scatch1 from "../images/Scatch1.jpg"
import Scatch2 from "../images/Scatch2.jpg"

export const projectData = [
  {
    title: "Odin Mono Web Apps",
    description:
      "A collection of web-based projects created with React, TypeScript, and Redux.",
    link: "https://github.com/itkrivoshei/OdinMonoWebApps",
    image: window.innerWidth >= 700 ? Odin1 : Odin2,
    tags: ["React", "Redux", "TypeScript"],
  },
  {
    title: "DevOptima Landing Page",
    description:
      "A beautifully crafted landing page built with TypeScript, React, and Tailwind CSS for showcasing DevOptima's services.",
    link: "https://kriv.dev/devoptima-landing",
    image: window.innerWidth >= 700 ? Optima1 : Optima2,
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Weather App",
    description:
      "A dynamic weather app that provides real-time weather forecasts with a sleek UI and integration with Weather API and Giphy API.",
    link: "https://itkrivoshei.github.io/OdinMonoWebApps/#/WeatherApp",
    image: window.innerWidth >= 700 ? Weather1 : Weather2,
    tags: ["React", "Redux Toolkit", "TypeScript", "Material UI"],
  },
  {
    title: "Todo Management App",
    description:
      "An interactive app for managing tasks and projects, developed using React, TypeScript, and Redux Toolkit with a lo-fi theme.",
    link: "https://itkrivoshei.github.io/OdinMonoWebApps/#/TodoApp",
    image: window.innerWidth >= 700 ? Todo1 : Todo2,
    tags: ["React", "TypeScript", "Redux Toolkit", "Material UI"],
  },
  {
    title: "Calculator App",
    description:
      "A web-based calculator designed to mimic the IBM keyboard numpad, developed using React, TypeScript, and SCSS with sound effects.",
    link: "https://itkrivoshei.github.io/OdinMonoWebApps/#/Calculator",
    image: window.innerWidth >= 700 ? Calc1 : Calc2,
    tags: ["React", "TypeScript", "SCSS", "Howler.js"],
  },
  {
    title: "Sign-up Form App",
    description:
      "An interactive sign-up form with dynamic validation, matrix-style background animation, and custom phone number formatting.",
    link: "https://itkrivoshei.github.io/OdinMonoWebApps/#/SignUpForm",
    image: window.innerWidth >= 700 ? Form1 : Form2,
    tags: ["React", "TypeScript", "Form Validation"],
  },
  {
    title: "Etch-A-Sketch App",
    description:
      "A modern take on the classic Etch-A-Sketch, featuring customizable grid sizes and color modes developed using React and TypeScript.",
    link: "https://itkrivoshei.github.io/OdinMonoWebApps/#/EtchASketch",
    image: window.innerWidth >= 700 ? Scatch1 : Scatch2,
    tags: ["React", "TypeScript", "SCSS", "Canvas"],
  },
]
