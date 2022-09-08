import { CssBaseline } from "@mui/material";
import { AppProps } from "next/app";
import { GlobalStyle } from "../../styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { Content } from "../../styles/pages";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <div style={{ position: "absolute", top: "0", right: "0" }}>
        <ToastContainer />
      </div>
      <Header />
      <Content>
        <Component {...pageProps} />
      </Content>
    </>
  );
}

export default MyApp;
