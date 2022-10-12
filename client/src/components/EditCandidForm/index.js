import React, { useEffect, useState } from "react";
import {useMutation } from "@apollo/client";
import { SERVER_URL } from "../../utils/vars";
import { UPDATE_CANDID } from "../../utils/mutations";
import { Link } from "react-router-dom";
// import { UPLOAD_FILE, UPDATE_CANDID } from "../../utils/mutations";

const EditCandidForm = ({ id, image, productName, retailer }) => {
  // const fileReader = new FileReader();
  // const [files, setFiles] = useState([]);
  //const [src, setSrc] = useState(image);
  const [savedOk, setSavedOk] = useState(false);
  const [currentProductName, setProductName] = useState(productName);
  const [currentRetailer, setRetailer] = useState(retailer);

  const [updateCandid] = useMutation(UPDATE_CANDID);
  //const [fileUploadMutation] = useMutation(UPLOAD_FILE);

  // function fileView(event) {
  //   console.log("files", event.target.files);
  //   setFiles(event.target.files);
  //   const file = event.target.files[0];

  //   fileReader.onload = (event) => {
  //     setSrc(event.target.result);
  //   };
  //   if (!(file instanceof Blob)) return;
  //   fileReader.readAsDataURL(file);
  // }


  // function fileUpload(submitEvent) {
  //   console.log("variables are " + files + " " + retailer + " " + product)
  //   submitEvent.preventDefault();
  //   (async () => {
  //     try {
  //       await fileUploadMutation({
  //         variables: {
  //           file: files[0],
  //           retailer: retailer,
  //           product: product
  //         },
  //       });
  //       setFiles([]);
  //     } catch (e) {
  //       console.error("error during file upload", e);
  //     }
  //   })();
  // }

  // useEffect(() => {
  //   if (localStorage.getItem("id_token")) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, [files.length]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(currentProductName);
    console.log(currentRetailer);

    const { data } = await updateCandid({
      variables: {
        candidId: id,
        newProductName: currentProductName,
        newRetailer: currentRetailer,
      },
    });

    if (data.updateCandid.ok) {
      setSavedOk(true);
    }
  }

  return (
    <div className="col-12 col-md-6">
      <div className="card">
        <h4 className="card-header">Edit Your Candid</h4>
        <div className="card-body">
          {savedOk ? (
            <div>
              <h2>Changes Saved Successfully!</h2>
              <button
                className="btn d-block w-100"
                onClick={() => setSavedOk(false)}
              >
                Edit Again
              </button>
              <Link to="/profile">See your candids</Link>
            </div>
          ) : (
            <form>
              {/* <input
                className="form-input"
                name="fileUpload"
                type="file"
                id="upload"
                onChange={fileView}
                accept="image/png, image/jpg, image/jpeg"
              /> */}
              <img style={{display: 'block'}} src={`${SERVER_URL}/candid-photos/${image}`} alt={image} />
              <label>Product Name</label>
              <input
                className="form-input"
                placeholder="Product"
                name="productName"
                type="text"
                id="productName"
                onChange={(e) => setProductName(e.target.value)}
                value={currentProductName}
              />
              <label>Choose a Retailer Below</label>
              <select className="form-input" value={currentRetailer} id="retailer" name="retailer"  onChange={(e) => setRetailer(e.target.value)}>
                <option value="Loblaws">Loblaws</option>
                <option value="Sobeys">Sobeys</option>
                <option value="Metro">Metro</option>
                <option value="Wholefoods">Wholefoods</option>
                <option value="Fortinos">Fortinos</option>
              </select>
              {/* {files.length > 0 && src.length > 0 && (
                <div className="flex flex-wrap card z-10">
                  <div className="w-full text-center pr-5 md:p-2 z-10">
                    <img
                      src={src}
                      className="card-img-top card-image"
                      alt="uploaded candid"
                      width="400px"
                      height={"auto"}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        Product - 
                        {product}
                      </h5>
                      <h5 className="card-title">
                        Retailer - {retailer}
                      </h5>
                      <button
                        className="btn d-block w-100"
                        type="submit"
                        onClick={fileUpload}
                      >
                        Upload File
                      </button>
                    </div>
                  </div>
                </div>
              )} */}
              <button
                className="btn d-block w-100"
                type="submit"
                onClick={submitHandler}
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCandidForm;
