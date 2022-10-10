import React, { useEffect, useState } from "react";
import {useMutation } from "@apollo/client";
import { UPLOAD_FILE, ADD_CANDID, REMOVE_CANDID } from "../../utils/mutations";

const UploadCandidForm = () => {
  const fileReader = new FileReader();
  const [files, setFiles] = useState([]);
  const [src, setSrc] = useState("");
  const [product, setProduct] = useState("")
  const [retailer, setRetailer] = useState("")
  const [loggedIn, setLoggedIn] = useState(false);
  const [fileUploadMutation] = useMutation(UPLOAD_FILE);

  function fileView(event) {
    console.log("files", event.target.files);
    setFiles(event.target.files);
    const file = event.target.files[0];

    fileReader.onload = (event) => {
      setSrc(event.target.result);
    };
    if (!(file instanceof Blob)) return;
    fileReader.readAsDataURL(file);
  }

  function setProductName(event) {
    const product = document.getElementById("productName").value
    setProduct(product);
  }

  function setRetailerName(event) {
    const retailer = document.getElementById("retailer").value
    setRetailer(retailer);
  }

  function fileUpload(submitEvent) {
    console.log("variables are " + files + " " + retailer + " " + product)
    submitEvent.preventDefault();
    (async () => {
      try {
        await fileUploadMutation({
          variables: {
            file: files[0],
            retailer: retailer,
            product: product
          },
        });
        setFiles([]);
      } catch (e) {
        console.error("error during file upload", e);
      }
    })();
  }

  useEffect(() => {
    if (localStorage.getItem("id_token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [files.length]);

  return (
    <div className="col-12 col-md-6">
      <div className="card">
        <h4 className="card-header">Upload Your Candid</h4>
        <div className="card-body">
          <form>
            <input
              className="form-input"
              name="fileUpload"
              type="file"
              id="upload"
              onChange={fileView}
              accept="image/png, image/jpg, image/jpeg"
            />
            <input
              className="form-input"
              placeholder="Product"
              name="productName"
              type="text"
              id="productName"
              onChange={setProductName}
            />
            <label>Choose a Retailer Below</label>
            <select className="form-input" id="retailer" name="retailer"  onChange={setRetailerName}>
              <option value="Loblaws">Loblaws</option>
              <option value="Sobeys">Sobeys</option>
              <option value="Metro">Metro</option>
              <option value="Wholefoods">Wholefoods</option>
              <option value="Fortinos">Fortinos</option>
            </select>
            {files.length > 0 && src.length > 0 && (
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
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadCandidForm;
