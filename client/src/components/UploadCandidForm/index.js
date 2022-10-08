import React, { useState } from 'react';

// dummy data (will replace with server data)
const retailerOptions = [
  {_id: '1', name: 'Walmart'}, // potentially have an image as well
  {_id: '2', name: 'Zellers'},
  {_id: '3', name: 'Best Buy'},
  {_id: '4', name: 'The Bay'},
  {_id: '5', name: 'Food Basics'},
  {_id: '6', name: 'NoFrills'},
  {_id: '7', name: 'Freshco'},
]

const UploadCandidForm = () => {
  const [image, setImage] = useState('');
  const [productName, setProductName] = useState('');
  const [retailer, setRetailer] = useState('');

  const [imageError, setImageError] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [retailerError, setRetailerError] = useState('');

  const handleImageInput = (e) => {
    const filePath = e.target.value;
    setImage(filePath);
    setImageError('');
  }
  
  const handleProductNameInput = (e) => {
    const name = e.target.value;
    setProductName(name);
    setProductNameError('');
  }

  const handleRetailerInput = (e) => {
    const r = e.target.value;
    setRetailer(r);
    setRetailerError('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    // !'' not false = true
    if (!image) { // check whether the image string is set
      // display image error
      setImageError('An image must be selected');
      valid = false;
    }
    if (!productName) {
      setProductNameError('Product name must be set');
      valid = false;
    }
    if (!retailer) {
      setRetailerError('Retailer must be selected')
      valid = false;
    }

    // only submit form when there are no invalid inputs

    if(valid) {
      // submit the data to the server
      console.log('submitting form...')
      console.log('productName', productName);
      console.log('image', image);
      console.log('retailer', retailer);
      
      // reset the form after a successful submission
      setImage('');
      setProductName('');
      setRetailer('');
    }
  }

  return (
    <form
      className="border border-primary rounded mx-5"
      onSubmit={handleSubmit}
    >
      <div className="form-group d-flex flex-column">
        {/* File Input */}
        <label htmlFor="fileInput">Candid Image</label>
        <input
          type="file"
          className={`form-control ${imageError && 'input-error'}`}
          id="fileInput"
          aria-describedby="emailHelp"
          placeholder="Upload Image"
          onChange={handleImageInput}
          value={image}
        />
        {imageError && <div className='text-error'>{imageError}</div>}
        {/* Product Name Input */}
        <label htmlFor="productNameInput">Candid Product Name</label>
        <input
          type="text"
          className={`form-control ${productNameError && 'input-error'}`}
          id="productNameInput"
          aria-describedby="productNameHelp"
          placeholder="Enter your product name"
          onChange={handleProductNameInput}
          value={productName}
        />
        {productNameError && <div className='text-error'>{productNameError}</div>}
        {/* Retailer Dropdown */}
        <label htmlFor="retailerInput">Retailer</label>
        {/* <input
          type="text"
          className="form-control"
          id="retailerInput"
          aria-describedby="retailerHelp"
          placeholder="Choose retailer"
          onChange={handleRetailerInput}
          value={retailer}
        /> */}
        <select
          id="retailerInput"
          className={`custom-select ${retailerError && 'input-error'}`}
          onChange={handleRetailerInput}
          value={retailer}
        >
          <option value=''>Choose Retailer:</option>
          {retailerOptions.map((r) => (
            <option
              key={r._id}
              value={r._id}
            >
              {r.name}
            </option>
          ))}
        </select>
        {retailerError && <div className='text-error'>{retailerError}</div>}
      </div>
     
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default UploadCandidForm;
