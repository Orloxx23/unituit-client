import React from "react";
import Share from "../share/Share";
import "./tuitModal.css";
import Draggable from "react-draggable";

export default function TuitModal({ open, setOpen }) {
  return (
    <div className={open ? "" : "tuitModalClose"}>
      <Draggable>
        <div className="tuitModal">
          <div className="tuitModal-head">
            <h3>Tuitear</h3>
            <hr />
            <i className="fa-solid fa-xmark" onClick={() => setOpen(!open)}></i>
          </div>
          <Share />
        </div>
      </Draggable>
      <div className="modalOverlay"></div>
    </div>
  );
}
