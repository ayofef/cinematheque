import React from 'react';
import Layout from "./containers/Layout/Layout";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Layout />
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
