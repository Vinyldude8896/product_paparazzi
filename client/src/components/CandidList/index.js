// import React
import React from "react";

// importing the Picturecard model
import { PictureCard } from "../PictureCard";

// this function will be given an array of candids objects and a title
const CandidList = ({ candids, title }) => {
  // if the candids array is empty return the h3
  if (!candids.length) {
    return <h3>No Candids Yet</h3>;
  }

  // if we have candids data this return will give us a PictureCard for each candid object
  // in the array.
  // we are also passing the Picturecard component these variables are also passed
  // key, candidID, image, productName, retailer, dateUploaded, owner
  // setting the showRemovebutton to false
  return (
    <div>
    <h1 className="text-center text-4xl font-bold text-dark">{title}</h1>
    <div className="pictureBox">
      {candids.map(
        ({ image, productName, retailer, createdAt, _id, username }) => (
          <PictureCard
            key={_id}
            candidId={_id}
            image={image}
            productName={productName}
            retailer={retailer}
            dateUploaded={createdAt}
            owner={username}
            showRemoveButton={false}
          />
        )
      )}
    </div>
    </div>
  );
};

// exporting component Candidlist
export default CandidList;
