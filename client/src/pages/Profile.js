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
import logoLoblaws from "../images/LogoLoblaws.png";
import logoSobeys from "../images/LogoSobeys.jpg";
import logoMetro from "../images/LogoMetro.jpg";
import logoWholefoods from "../images/LogoWholefoods.png";
import logoFortinos from "../images/LogoFortinos.jpg";


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
      shelfImage: Kombucha1,
      productName: 'Kombucha1',
      retailer: 'Loblaws',
      retailerLogo:logoLoblaws
    },
    {
      shelfImage: Kombucha2,
      productName: 'Kombucha2',
      retailer: 'Metro',
      retailerLogo: logoMetro
    },
    {
      shelfImage: Kombucha3,
      productName: 'Kombucha3',
      retailer: 'Sobeys',
      retailerLogo: logoSobeys
    },
    {
      shelfImage: Kombucha4,
      productName: 'Kombucha4',
      retailer: 'Whole Foods Market',
      retailerLogo: logoWholefoods
    },
    {
      shelfImage: Kombucha5,
      productName: 'Kombucha5',
      retailer: 'Metro',
      retailerLogo: logoMetro
    },
    {
      shelfImage: Kombucha6,
      productName: 'Kombucha6',
      retailer: 'Fortinos',
      retailerLogo: logoFortinos
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
        {portfolios.map(({ shelfImage, productName, retailer, retailerLogo }) => (
          <div className="card">
          <div key={shelfImage} className="">
            <p className="flex-row mb-3 text-center">
            <img
              src={retailerLogo}
              alt={retailer}
              className="retailerLogo"
            />
              {retailer}, 
              {productName}</p>
            <img
              src={shelfImage}
              alt={retailer}
              className="shelfImage"
            />
          </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Profile;
