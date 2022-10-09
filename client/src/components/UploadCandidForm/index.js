import React from 'react'

const UploadCandidForm = () => {
  return (
    <form className="">
      <div className="form-group d-flex flex-column">
        {/* File Input */}
        <input type="file" className="form-control" id="fileInput" aria-describedby="emailHelp" placeholder="Enter email" />
        {/* Product Name Input */}
        <label htmlFor="productNameInput">Product Name</label>
        <input type="text" className="form-control" id="productNameInput" aria-describedby="productNameHelp" placeholder="Enter your product name" />
        {/* Retailer Dropdown */}
        <label htmlFor="retailerInput">Retailer</label>
        <input type="text" className="form-control" id="retailerInput" aria-describedby="retailerHelp" placeholder="Choose retailer" />
      </div>
     
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default UploadCandidForm;
