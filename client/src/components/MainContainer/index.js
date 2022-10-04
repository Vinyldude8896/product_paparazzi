// import React, { useState } from "react";
// import Nav from "../Nav";
// import Home from ".."


// export default function MainContainer() {
//     const [currentPage, setCurrentPage] = useState("Home");

//   const renderPage = () => {
//     if (currentPage === "Home") {
//       return <Home />;
//     }
//     if (currentPage === "Products") {
//       return <Home />;
//     }
//     if (currentPage === "Upload Product") {
//     }
//   };

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div>
//       <Nav currentPage={currentPage} handlePageChange={handlePageChange} />
//       {renderPage()}
//         </div>
//   );
// }