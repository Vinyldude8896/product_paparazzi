import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditCandidForm from '../components/EditCandidForm';
import { QUERY_CANDID } from '../utils/queries';

const EditCandid = () => {
  const { candidId } = useParams();

  const {loading, data, error} = useQuery(QUERY_CANDID, {variables: { id: candidId }});

  useEffect(() => {
    console.log(candidId);
  }, [candidId]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error Occured</div>
  }

  if (!data.candid) {
    return <div>No Candid found with id {candidId}</div>
  }

  return (
    <div className="container">
      <EditCandidForm
        productName={data.candid.productName}
        id={data.candid._id}
        retailer={data.candid.retailer}
        image={data.candid.image}
      />
    </div>
  );
}

export default EditCandid