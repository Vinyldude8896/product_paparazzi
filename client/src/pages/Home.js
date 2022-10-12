import React, { useEffect } from "react";
import Auth from "../utils/auth";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_ME_BASIC , QUERY_CANDIDS} from "../utils/queries";
import CandidList from "../components/CandidList";
import BackgroundImage from "../images/shopcartaisle.jpeg";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { loading, data } = useQuery(QUERY_CANDIDS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
//   const locationKey = useLocation().key;
//   const user = Auth.getProfile().data;

//   // will import out photos here
// const [getCandids, {loading: loadingCandids, data: candidsData, error}] = useLazyQuery(QUERY_CANDIDS, {
//   variables: { username: user.username}
// })

// useEffect(() => {
//   getCandids();
// }, [locationKey. getCandids]);

// if (loadingCandids || !candidsData) {
//   return <div>Loading....</div>
// }

// if (error) {
//   return <div>Error occured</div>
// }

  const loggedIn = Auth.loggedIn();

  return (
    <main >
      <div className="col-12">
        {!loggedIn && (
          <div>
            <img className=" myBackgroundImage" src={BackgroundImage} alt="shopping cart in aisle" />
          </div>
        )}

        {/* {loggedIn && (

          <div className ="col-12 mb-3">
          <CandidList
          candids = {candidsData.candids}
          title = "Current Candids"
          />
          </div>
        )} */}
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
