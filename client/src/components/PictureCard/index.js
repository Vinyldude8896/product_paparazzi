import React from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../utils/vars";

export const PictureCard = ({ image, productName, retailer, dateUploaded, candidId, owner, remove, showRemoveButton }) => {

  return (
    <div className="flex flex-wrap card z-10">
      <div className="w-full text-center pr-5 md:p-2 z-10" style={{position: 'relative'}}>
        {showRemoveButton && <button className="candid-remove-btn" onClick={remove}>x</button>}
        <img src={`${SERVER_URL}/candid-photos/${image}`} className="card-img-top card-image" alt={image}></img>
        <div className="card-body">
          <h5 className="card-title">Product - {productName}</h5>
          <h5 className="card-title">Retailer - {retailer}</h5>
          <h5 className="card-title">Date Uploaded - {dateUploaded}</h5>
          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        </div>
        <Link to={`/candid/${candidId}`}>Edit</Link>
      </div>
    </div>
  );
}
