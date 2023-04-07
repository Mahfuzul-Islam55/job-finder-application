import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import store from "@/redux/Store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Provider store={store}>
        <Navbar />
        <Sidebar />
        <Component {...pageProps} />
      </Provider>
    </Fragment>
  );
}
