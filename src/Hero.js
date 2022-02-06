import React from "react";
import MoveBox from "./images/move_box.svg";
import Move from "./images/move.svg";
export default function Hero() {
  return (
    <div className="container">
      <div className="first-box" data-aos="zoom-in" data-aos-duration="1000">
        <img src={Move} alt="Lady packing things into a box"></img>
      </div>
      <div className="second-box" data-aos="zoom-in" data-aos-duration="1000">
        <h2>Customer Satisfaction</h2>
        <ul>
          <li>
            Affordable pricing
          </li>
          <li>
            Professional movers you can trust
          </li>
          <li>
            Excellent customer service
          </li>
        </ul>
      </div>
      <div className="third-box" data-aos="zoom-in" data-aos-duration="1000">
        <h2>
          Perks
        </h2>
        <ul>
          <li>
            Very simple booking process
          </li>
          <li>
            Free boxes to help you move
          </li>
          <li>
            Speedy yet careful service to save you money
          </li>
        </ul>
      </div>
      <div className="fourth-box" data-aos="zoom-in" data-aos-duration="1000">
        <img src={MoveBox} alt="Man sitting on a box with a dolly"></img>
      </div>
    </div>
  )
}

