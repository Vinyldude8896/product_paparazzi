import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import { QUERY_CANDIDS } from "../utils/queries";
import Auth from "../utils/auth";
import { SERVER_URL } from "../utils/vars";

const Profile = (props) => {
  const location = useLocation();
  const user =  Auth.getProfile().data;
  
  const [getCandids, { loading: loadingCandids, data: candidsData, error }] = useLazyQuery(QUERY_CANDIDS, {
    variables: { username:  user.username },
    fetchPolicy: 'cache-and-network'
  });

  // refetch candids everytime coming to this page
  useEffect(() => {
    getCandids();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (loadingCandids || !candidsData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occured</div>;
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {`${user.username}'s`} profile.
        </h2>
      </div>
      <div className="pictureBox">
        {candidsData.candids.map(({ image, productName, retailer, createdAt, _id }) => (
          <div key={_id} className="card">
            <p className="">
              {/* <img
                src={retailerLogo}
                alt={retailer}
                className="retailerLogo"
              /> */}
              {retailer}   ,
              {productName}  ,
              Date updated {createdAt} </p>
            <img
              src={`${SERVER_URL}/candid-photos/${image}`}
              alt={retailer}
              className="shelfImage"
            />
          </div>
        ))}
      </div>
    </div>
  );

};

export default Profile;
