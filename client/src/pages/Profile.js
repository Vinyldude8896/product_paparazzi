import React from "react";
import { Navigate, useParams } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import Kombucha1 from "../images/Kombucha1.png";
import Kombucha2 from "../images/Kombucha2.png";
import Kombucha3 from "../images/Kombucha3.png";
import Kombucha4 from "../images/Kombucha4.png";
import Kombucha5 from "../images/Kombucha5.png";
import Kombucha6 from "../images/Kombucha6.png";

const Profile = (props) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const portfolios = [
    {
      image: Kombucha1,
      productName: 'Kombucha1',
      retailer: 'Loblaws'
    },
    {
      image: Kombucha2,
      productName: 'Kombucha2',
      retailer: 'Metro'
    },
    {
      image: Kombucha3,
      productName: 'Kombucha3',
      retailer: 'Sobeys'
    },
    {
      image: Kombucha4,
      productName: 'Kombucha4',
      retailer: 'Fortinos'
    },
    {
      image: Kombucha5,
      productName: 'Kombucha5',
      retailer: 'Fortinos'
    },
    {
      image: Kombucha6,
      productName: 'Kombucha6',
      retailer: 'Fortinos'
    },
  ];

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
      </div>
      <div className="col-md-4 services">
        {portfolios.map(({ image, productName, retailer }) => (
          <div key={image} className="">
            <img
              src={image}
              alt={retailer}
              className=""
            />
            <p className="mt-4 text-center">{retailer}</p>
            <div className="flex items-center justify-center">
              <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                <a href={retailer} target="_blank" rel="noreferrer">Demo</a>
              </button>
              <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                <a href={productName} target="_blank" rel="noreferrer">Repo</a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Profile;
