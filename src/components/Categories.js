import React from "react";

export default function Categories(props) {
  return (
    <div className="d-flex justify-content-evenly" onClick={()=>{props.filterMenu(props.nama)}}>
      <div>
        <div
          style={{
            overflow: "hidden",
            borderRadius: "100px",
            width: "10em",
            height: "10em",
          }}
        >
          <img src={`img/${props.nama}.jpg`} style={{ width: "10em" }} />
        </div>
        <div>
          <strong>{props.nama}</strong>
        </div>
      </div>
    </div>
  );
}
