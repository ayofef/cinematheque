import React from 'react';
import Layout from "./containers/Layout/Layout";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import ReactGA from 'react-ga';


ReactGA.initialize('UA-167535693-1');
ReactGA.pageview(window.location.pathname + window.location.search);

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
