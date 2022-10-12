import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_MY_CANDIDS } from "../utils/queries";
import Auth from "../utils/auth";

import { PictureCard } from "../components/PictureCard";
import { REMOVE_CANDID } from "../utils/mutations";

const Profile = (props) => {
  const location = useLocation();
  const user =  Auth.getProfile().data;

  const [removeCandid, {loading: removeLoading}] = useMutation(REMOVE_CANDID, {
    refetchQueries: [
      {
        query: QUERY_MY_CANDIDS,
        variables: { username:  user.username },
        fetchPolicy: 'cache-and-network'
      },
    ],
  });

  
  const { loading, data, error, refetch } = useQuery(QUERY_MY_CANDIDS, {
    variables: { username:  user.username },
    fetchPolicy: 'cache-and-network'
  });

  // refetch candids everytime coming to this page
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  
  const removeCandidHandler = async (id) => {
    const { data } = await removeCandid({ variables: { candidId: id } });
    if (data.ok) {
      // refresh candids since deletion occured
      // await refetch();
    } else {

    }
  }

  if (loading || removeLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occured</div>;
  }

  if (data.myCandids.length === 0) {
    return <h3>No Candids Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {`${user.username}'s`} profile.
        </h2>
      </div>
      <div className="pictureBox">
        {data.myCandids.map(({ image, productName, retailer, createdAt, _id, username }) => (
          <PictureCard
            key={_id}
            candidId={_id}
            image={image}
            productName={productName}
            retailer={retailer}
            dateUploaded={createdAt}
            owner={username}
            showRemoveButton
            remove={() => removeCandidHandler(_id)}
          />
        ))}
      </div>
    </div>
  );

};

export default Profile;
