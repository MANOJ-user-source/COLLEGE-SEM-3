import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import OOP from './pages/OOP'
import Maths from './pages/Maths'
import CN from './pages/CN'
import VC from './pages/VC'
import OS from './pages/OS'
import DTI from './pages/DTI'
import WDP from './pages/WDP'
import WDPProject1 from './pages/wdp/WDPProject1'
import WDPProject2 from './pages/wdp/WDPProject2'
import WDPProject3 from './pages/wdp/WDPProject3'
import WDPProject4 from './pages/wdp/WDPProject4'
import WDPProject5 from './pages/wdp/WDPProject5'
import WDPProject6 from './pages/wdp/WDPProject6'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oop" element={<OOP />} />
        <Route path="/maths" element={<Maths />} />
        <Route path="/cn" element={<CN />} />
        <Route path="/vc" element={<VC />} />
        <Route path="/os" element={<OS />} />
        <Route path="/dti" element={<DTI />} />
        <Route path="/wdp" element={<WDP />} />
        <Route path="/wdp/portfolio-website" element={<WDPProject1 />} />
        <Route path="/wdp/product-showcase" element={<WDPProject2 />} />
        <Route path="/wdp/responsive-layout" element={<WDPProject3 />} />
        <Route path="/wdp/calculator-validator" element={<WDPProject4 />} />
        <Route path="/wdp/dom-manipulator" element={<WDPProject5 />} />
        <Route path="/wdp/fullstack-project" element={<WDPProject6 />} />
      </Routes>
    </Router>
  )
}

export default App
