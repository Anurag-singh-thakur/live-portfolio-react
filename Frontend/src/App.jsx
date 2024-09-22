import Footer from "./component/Footer/Footer"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Home from "./component/Home/Home"
import Navbar from "./component/Navbar/Navbar"
import Skills from './component/Skills/Skills'
import Contact from './component/Blog/Blog'
import Blog from './component/Blog/Blog'
import Projects from './component/Projects/Projects'
function App() {
  return (
  
    <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
        <Footer/>


        </Router>
   
  )
}

export default App
