import React from "react";
import "./Projects.css";
import mediabazar from "./Pictures/mediaBazaarHR.png"
import Game from "./Pictures/WebsiteGameIMade.png"
import driessen from "./Pictures/Driessen.png"
import dreaner from "./Pictures/Dreamersteve.png"
import cloudpeak from "./Pictures/Cloudpeak.png"

export default function Projects(){
    return(
<div className="MainDivPrj">
<div className="Semester2">
<header>
    <h1>
        These are the projects form semster 2
    </h1>
    <ul>
        <li>
            <h3>Store Management assigemnt</h3>
            <img
            src={mediabazar}
            style={{height: "40vh", }}
            alt="A picture of a desktop application"
            />
            
        </li>

    </ul>
    <a href="../Semester2">learn more</a>
</header>
</div>
<div className="Semester3">
<header>
    <h1>
        These are the projects from semester 3
    </h1>
    <ul>
        <li>
            <h3>Driessen interview scheduling assingment</h3>
            <img
            src={driessen}
            style={{}}
            alt="This is a screenshot of a website a group I was part of made"
            />

            
           
        </li> 
        <p></p>
        <li>
            <h3>Website with Java individual assingment</h3>
            <img
            src= {Game}
            style={{height: "40vh"}}
            alt="My own game in react"
            />
           
        </li>
    </ul>
    <a href="../Semester3">Learn more!</a>
</header>
</div>

<div className="Semester4">
<header>
    <h1>
        These are the projects from semester 4 so far
    </h1>
    <ul>
        <li>
            <h3>Game pie assingment</h3>
            <img 
            src={dreaner}
            alt="A picture of a games main menu"
            />
        </li>
        <li>
            <h3>Your own Game assingment</h3>
            <img 
            src= {cloudpeak}
            />
        </li>
    </ul>
    <a href="../Semester4">Learn more!</a>
</header>
</div>

</div>
    )
};