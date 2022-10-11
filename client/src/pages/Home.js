import React, { useEffect } from "react";
import Auth from "../utils/auth";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_ME_BASIC , QUERY_CANDIDS} from "../utils/queries";
import CandidList from "../components/CandidCard";
import BackgroundImage from "../images/shopcartaisle.jpeg";

const Home = () => {
  const { loading, data } = useQuery(QUERY_CANDIDS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const candids = data?.candids || [];

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
              {CandidUploads.map(x =>{
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
