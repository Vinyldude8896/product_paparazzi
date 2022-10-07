import React from "react";
import { Navigate, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const couponCodes = ["023EryTHy678-0632"]


const Profile = (props) => {
  const { username: userParam } = useParams();
  //   const {}

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
    variablesPhotos: { photocount: useParams },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <section>
      <div className="flex-row card_incentive mt-5 ml-5 justify-space-between text-center  ">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title ">Incentive Tier 1</h5>
              <p className="card-text">
                Requirements: Minimum 3 candids to recieve this incentive tier.
              </p>
              <p className="card-text">
                Reward: with this reward you can redeem for a $5 off coupon.
              </p>
              <a href="#" className="btn btn-primary">
                Redeem Now
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Incentive Tier 2</h5>
              <p className="card-text">
                Requirements: Minimum 5 candids to recieve this incentive tier.
              </p>
              <p className="card-text">
                Reward: with this reward you can redeem for a $10 off coupon.
              </p>
              <a href="#" className="btn btn-primary">
                Redeem Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3 ml-5">
        <div className="card-header">Here is your Incentive Level</div>
        <div className="card-body">
          {/* This will use the variablesPhotos parameters */}
          <h5 className="card-title">You have currently uploaded 3 photos</h5>
          <p className="card-text">Your Incentive Tier is currently : Tier 1</p>
          <p>______________________________________________</p>
          <h5 className="card-title">Your previous redeemed coupon codes</h5>
          <a href={couponCodes} className="text-blue card-text">{couponCodes}</a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
