import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_COUPONS } from "../utils/queries";
import Auth from "../utils/auth";
import { ADD_COUPON } from "../utils/mutations";



const couponCodes = ["023EryTHy678-0632"]


const Profile = (props) => {
  const { username: userParam } = useParams();
  let redeemCounter = "";
  let couponCode = "";
  const [addCoupon] = useMutation(ADD_COUPON);
 

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
    variablesPhotos: { photocount: useParams },
  });

  const user = data?.me || data?.user || {};


 function createCoupon(event) {
  
  console.log (" Adding Coupon");
  redeemCounter = "5";
  couponCode = "023EryTHy678-0632";

  event.preventDefault();
  (async () => {
  
    try {
      await addCoupon ({
        variables: {
          couponText: "03tehaf4635GSTRA",
          redeemCounter: "5"
        },
      });
    } catch (e) {
      console.log("error during file upload", e);
    }
  })();
 }

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }


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
              <a href="#" className="btn btn-primary" onClick={createCoupon}>
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
      <div className="card mt-3 ml-5 mb-3">
        <div className="card-header">Here is your Incentive Level</div>
        <div className="card-body">
          {/* This will use the variablesPhotos parameters */}
          <h5 className="card-title">You have {redeemCounter}</h5>
          <p className="card-text">Your Incentive Tier is currently : Tier 1</p>
          <p>______________________________________________</p>
          <h5 className="card-title">Your previous redeemed coupon codes</h5>
          <a href={couponCodes} className="text-blue card-text">{couponCode}</a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
