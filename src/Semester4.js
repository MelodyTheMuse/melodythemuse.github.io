import React from "react";
import dreaner from "./Pictures/Dreamersteve.png"
import cloudpeak from "./Pictures/CloudpeakCombat.png"
import "./Semester4.css";

export default function Semester4(){
    return(
        <div className="SMaindiv">   
            <h1> Semester 4</h1>


            <h2>Game pie assingment</h2>
            <img 
            src={dreaner}
            alt="A picture of a games main menu"
            />

  
            <h3> 
            This was the first project I did in semester 4 with a group of 6. This was my first experience with Unity and it was super fun. I learned the basics of working with Unity. 
            The game itself is quite fun, specially because we use a grapple hook inside of the game as your main movement. 
            It is a first person platformer, with a dream setting. You objective is to reach a door and escape the nightmare you find yourself in. 
            </h3>
            <a href="https://davopia.itch.io/dreamer-steve"> Click here to play this game!</a>
            <p className="SpaceNeeded"></p>
            <h2>Your own Game assingment</h2>
            <img 
            src= {cloudpeak}
            />
             <h3> 
            This project was made by me and a second other student. This was a project where we could create any game we wanted inside of a certain genres, that we could choose out of. 
            It became a turned based dungeon crawler with random level generation per "floor" of the dungeon, sadly we do not have a WebGL version to be played as we are currently uncertain why the game breaks when using WebGL.
            
            </h3>
        </div>
    )
}