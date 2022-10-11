import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import Header from "./components/Header";
import Footer from "./components/Footer";


import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Incentives from "./pages/Incentives";
import UploadCandid from './pages/UploadCandid';
import ProtectedRoute from "./components/ProtectedRoute";


const httpLink = createHttpLink({
	uri:
		process.env.NODE_ENV === "development"
			? "http://localhost:3001/graphql"
			: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: authLink.concat(
      createUploadLink({
          headers: { "Apollo-Require-Preflight": "true" },
          uri:
              process.env.NODE_ENV === "development"
                  ? "http://localhost:3001/graphql"
                  : "/graphql",
      })
  ),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/incentives" 
                element={ 
                  <ProtectedRoute>
                    <Incentives />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/upload-candid" 
                element={
                  <ProtectedRoute>
                    <UploadCandid />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

/////////////////////////////////////////////////////////////////

// const SubscriptionDisplay = () => (
//   <section>
//     <div className="subscription">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//       <h3>Monthly Subscription</h3>
//       <h5>$3.00</h5>
//       </div>
//     </div>
//     <form action="/create-checkout-session" method="POST">
//       <button type="submit">
//         Checkout
//       </button>
//     </form>
//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// export default function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("cancelled")) {
//       setMessage(
//         "Order cancelled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return message ? (
//     <Message message={message} />
//   ) : (
//     <ProductDisplay />
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////

export default App;
