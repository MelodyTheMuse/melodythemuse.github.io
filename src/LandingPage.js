import React from "react";
import './App.css';
import BsCarousal from "./Components/BsCarousal";

function Landing() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="HomeH1">
            Welcome!
          </h1>
          <p className="HomeDescription">
            Hello!
            My name is Keano Dussel, I am a learning Software Developer with as specialisation Game Design at Fontys ICT!
            Currently in my 4th Semester, this webiste will contain some of the projects I have worked on over the years.
            Please take your time to go over them.
  
          </p>
        </header>
        <header className="LandingHeader">
        <BsCarousal/>
        </header>
      </div>
    );
  }
  
  export default Landing;