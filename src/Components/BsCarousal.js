import React from "react";
import {Carousel} from "react-bootstrap";
import pic from "../Pictures/GitlabProfile.png"
import fontys from "../Pictures/Fontys.png";
import "./BsCarousal.css";


export default function BsCarousal (){
return (
    <div className="MainDivBSC">
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block "
          src={pic}
          style={{height:"500px",width:"Auto", margin:"auto"}}
          alt="GitSlide"
        />
        <Carousel.Caption className="FirstSlide">
        <h3>My gitlab profile, where most projects have been going</h3>
          <p>I used this account mostly during the other semsters, but during my current semester 4 I use github due to it being better than gitlab for Unity</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fontys}
          style={{height:"70vh", width:"Auto", margin:"auto"}}
          alt="fontys Slide"
        />

        <Carousel.Caption>
          <h3>Fontys</h3>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  


    </div>

);

};