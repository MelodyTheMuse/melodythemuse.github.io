
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './Navbar/Navbar';
import Landing from './LandingPage.js';
import Contact from './Contact.js';
import Projects from './Projects';
import Semester3 from './Semester3';
import Semester2 from './Semeter2';
import Semester4 from './Semester4';

function App() {
  return (
    <div className="App">
     <Router>
      
      <NavBar />
      <Routes>
         <Route path='/' element={<Landing />}></Route>
         <Route path='/Contact' element={<Contact />}></Route>
         <Route path='/Projects' element={<Projects />}></Route> 
         <Route path='/Semester3' element={<Semester3 />}></Route> 
         <Route path='/Semester2' element={<Semester2 />}></Route> 
         <Route path='/Semester4' element={<Semester4 />}></Route> 
      </Routes>
      </Router>
    </div>
  );
}

export default App;
