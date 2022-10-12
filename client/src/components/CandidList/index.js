import React from "react";
import { PictureCard } from "../PictureCard";

const CandidList = ({ candids, title }) => {

  console.log("Data passed into candids list is ", candids)
  if (!candids.length) {
    return <h3>No Candids Yet</h3>
  }

  return (
    <div>
      <h1 className="text-center text-4xl font-bold text-dark">{title}</h1>
      {candids.map(({ image, productName, retailer, createdAt, _id, username }) => (
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
      ))}
    </div>
  );
}

export default CandidList;
