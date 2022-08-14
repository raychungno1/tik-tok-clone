import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Track if we are using server side rendering
  const [isSSR, setIsSSR] = useState(true);

  // If we come to this use effect,
  // then this code is being execured in react
  // (which is client side)
  useEffect(() => {
    setIsSSR(false);
  }, []);

  // If we're serverside rendering, don't show our components
  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="pt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
