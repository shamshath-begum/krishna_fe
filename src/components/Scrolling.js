import React from "react";
import scrollImage from "../assets/scrollImage.jfif"
// import "./Marquee.css";

function Scrolling() {
  return (
    <div className="marquee">
      <div className="marquee-content">
        <img
          src={scrollImage}
          alt="Sample"
          className="marquee-image"
        />
        <span className="marquee-text">"For one who has conquered his mind, the mind is best among friends, but for one who has failed to do so, the mind is the greatest enemy.”</span>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <img
          src={scrollImage}
          alt="Sample"
          className="marquee-image"
        />
        <span className="marquee-text">"For one who has conquered his mind, the mind is best among friends, but for one who has failed to do so, the mind is the greatest enemy.”</span><img
          src={scrollImage}
          alt="Sample"
          className="marquee-image"
        />
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        
        <span className="marquee-text">"For one who has conquered his mind, the mind is best among friends, but for one who has failed to do so, the mind is the greatest enemy.”</span>
      </div>
    </div>
  );
}

export default Scrolling;
