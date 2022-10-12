import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import Auth from "../utils/auth";
import { QUERY_ALL_CANDIDS } from "../utils/queries";
import CandidList from "../components/CandidList";
import BackgroundImage from "../images/shopcartaisle.jpeg";

const Home = () => {
  const location = useLocation();

  // will import out photos here
  const {loading, data, error, refetch} = useQuery(QUERY_ALL_CANDIDS, { fetchPolicy: 'cache-and-network'});

  // whenever visiting the page, fetch all candids
  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (loading) {
    return <div>Loading....</div>
  }

if (error) {
  return <div>Error occured</div>
}

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="col-12">
        {!loggedIn && (
          <div>
            <img className=" myBackgroundImage" src={BackgroundImage} alt="shopping cart in aisle" />
          </div>
        )}

         {loggedIn && (

          <div className ="col-12 mb-3">
            <CandidList
              candids = {data.allCandids}
              title = "Current Candids"
            />
          </div>
				)}
        {!loggedIn && (
				<div className="col-12 mb-3 col-lg-8">
          <div className="col-12 mb-3">
            <div className="bg-text">
              <h2>Help Your Favourite Brand and Be Rewarded</h2>
            </div>
          </div>
        </div>
           )}
      </div>
    </main>
  );
};
//adding comment so i can push
export default Home;
