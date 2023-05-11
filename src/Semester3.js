import React from "react";

import driessen from "./Pictures/Driessen.png"

import Game from "./Pictures/WebsiteGameIMade.png"
import "./Semester4.css"

export default function Semester3(){
    return(
        <div className="SMaindiv">   
            <h1>Semester 3</h1>
            <h2>Driessen project / the group project</h2>
            <img
            src={driessen}
            style={{}}
            alt="This is a screenshot of a website a group I was part of made"
            />

            <h3> 
                In this project, I worked in a team of 7 and enjoyed it a lot. In this project we worked with react and c# to create the front end with react and the back end with c#.
                I mostly worked on the backend and endpoints of the application and the website. As well as testing with unit, intergration tests. 
            </h3> 
 <p className="SpaceNeeded"></p>
            <h2>Website with Java / individual project</h2>
            <img
            src= {Game}
            style={{height: "40vh"}}
            alt="My own game in react"
            />

            <h3> 
                This was the semester's individual project. In this I was allowed to make what ever website I wanted. We learned how to use react JavaScript and Java. 
                It was a very fun to work on this project, as I tried to make a game with react,
                which is what the picture above shows. 
            </h3> 
        </div>
    )
}