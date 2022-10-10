import React from "react";

export function PictureCard(props) {
  return (
    <div className="flex flex-wrap card z-10">
      <div className="w-full text-center pr-5 md:p-2 z-10">
        <img src={props.image} class="card-img-top card-image" alt={props.image}></img>
        <div className="card-body">
          <h5 className="card-title">Product - {props.productName}</h5>
          <h5 className="card-title">Retailer - {props.retailer}</h5>
          <h5 className="card-title">Date Uploaded - {props.dateUploaded}</h5>
          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  );
}
