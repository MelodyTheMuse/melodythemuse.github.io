import React from "react";
import "./Projects.css";
import mediabazar from "./Pictures/mediaBazaarHR.png"
import Game from "./Pictures/WebsiteGameIMade.png"
import driessen from "./Pictures/Driessen.png"
import dreaner from "./Pictures/Dreamersteve.png"
import cloudpeak from "./Pictures/Cloudpeak.png"
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Projects(){

    const navigate = useNavigate();

const HandleSumbitSem2 = (e) => {
    e.preventDefault();
    console.log("Change the page");
 return navigate('/Semester2')
}

const HandleSumbitSem3 = (e) => {
    e.preventDefault();
    console.log("Change the page");
 return navigate('/Semester3')
}

const HandleSumbitSem4 = (e) => {
    e.preventDefault();
    console.log("Change the page");
 return navigate('/Semester4')
}
    return(
<div className="MainDivPrj">
<div className="Semester2">

<header>
    
<form onSubmit={HandleSumbitSem2}> 
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
  <button type="Submit" > Click to learn more</button>
  </form>
</header>
</div>
<div className="Semester3">
<header>
    <form onSubmit={HandleSumbitSem3}>
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
  <button type="Submit" > Click to learn more</button>
    </form>
</header>
</div>

<div className="Semester4">
<header>
    <form onSubmit={HandleSumbitSem4}> 
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
  <button type="Submit" > Click to learn more</button>
    </form>
</header>

</div>
</div>
    )
};