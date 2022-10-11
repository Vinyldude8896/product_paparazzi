import React from "react";
import { SERVER_URL } from "../../utils/vars";


const CandidCard = ({candids , title}) => {


    console.log("Data passed into candids list is " , candids)
    if (!candids.length) {
        return <h3>No Candids Yet</h3>
    }

  return (
    <div>
         <h1 className="text-center text-4xl font-bold text-dark">{title}</h1>
        {candids.map(({image, productName, retailer, createdAt, _id}) => {
                return(

                 <div className="flex flex-wrap card z-10">
                 <div className="w-full text-center pr-5 md:p-2 z-10">
                   <img 
                   className="card-img-top card-image"
                    alt={retailer}
                    src={`${SERVER_URL}/candid-photos/${image}`}
                    ></img>
                   <div className="card-body">
                     <h5 className="card-title">Product - {productName}</h5>
                     <h5 className="card-title">Retailer - {retailer}</h5>
                     <h5 className="card-title">Date Uploaded - {createdAt}</h5>
                     {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                     {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                   </div>
                 </div>
               </div>
                )
        })}
   </div>
  );
}

export default CandidCard;