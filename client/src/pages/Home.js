import React from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME_BASIC } from "../utils/queries";
import { PictureCard } from "../components/PictureCard";
import BackgroundImage from "../images/shopcartaisle.jpeg";

import Kombucha1 from "../images/Kombucha1.png";
import Kombucha2 from "../images/Kombucha2.png";
import Kombucha3 from "../images/Kombucha3.png";
import Kombucha4 from "../images/Kombucha4.png";
import Kombucha5 from "../images/Kombucha5.png";
import Kombucha6 from "../images/Kombucha6.png";

const CandidUploads = [
  {
    image: Kombucha1,
    productName: "Kombucha1",
    retailer: "Loblaws",
    dateUploaded: new Date().getDay(),
  },
  {
    image: Kombucha2,
    productName: "Kombucha2",
    retailer: "Metro",
    dateUploaded: new Date().getMonth(),
  },
  {
    image: Kombucha3,
    productName: "Kombucha3",
    retailer: "Sobeys",
    dateUploaded: new Date().getMonth(),
  },
  {
    image: Kombucha4,
    productName: "Kombucha4",
    retailer: "Fortinos",
    dateUploaded: new Date().getMonth(),
  },
  {
    image: Kombucha5,
    productName: "Kombucha5",
    retailer: "Fortinos",
    dateUploaded: new Date().getMonth(),
  },
  {
    image: Kombucha6,
    productName: "Kombucha6",
    retailer: "Fortinos",
    dateUploaded: new Date().getMonth(),
  },
];

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // will import out photos here
  // const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main >
      <div className="col-12">
        {!loggedIn && (
          <div>
            <img className=" myBackgroundImage" src={BackgroundImage} alt="shopping cart in aisle" />
          </div>
        )}

        {loggedIn && (
          <section className="m-10">
            <div className="sm:text-center lg:text-left pb-3 z-10">
              <h1 className="text-center text-4xl font-bold">
                <span className="card-title text-dark">Current Candids </span>
              </h1>
            </div>
            {CandidUploads.map(x => {
              return (
                <PictureCard key={x.key} image={x.image} productName={x.productName} retailer={x.retailer} dateUploaded={x.dateUploaded}></PictureCard>
              )
            })}
          </section>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {!Auth.loggedIn() ? (
            <>
              <div class="bg-text">
                <h2>Help Your Favourite Brand and Be Rewarded</h2>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3"></div>
        ) : null}
      </div>
    </main>
  );
};
//adding comment so i can push
export default Home;
