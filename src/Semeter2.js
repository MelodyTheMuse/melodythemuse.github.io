import React from "react";
import mediabazar from "./Pictures/mediaBazaarHR.png"
import "./Semester4.css"

export default function Semester2(){
    return(
        <div className="SMaindiv">   
            <h1> Semester2</h1>
            <img 
            src= {mediabazar}
            style={{height: "60vh", }}
            />

            <h3> 
                This project was fun to work on.
                I had to work in a group of 6 including myself. The assigment was to make a desktop application and a website for a store, that helped it's employees maintain their schedule and the stores inverntory.
                I learned a lot in terms of team work.
            </h3>
        </div>
    )
}