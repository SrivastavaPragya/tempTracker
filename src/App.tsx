
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/HomePage/Home';
import Navbar from "./components/Header/Navbar"
import DetailPage from './components/DetailPage/DetailPage';


function App() {
 

  return (
    
      <>
  <Router>
<Navbar/>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/details/:city" element={<DetailPage/>} />
</Routes>
</Router>
      </>
  )
}

export default App
