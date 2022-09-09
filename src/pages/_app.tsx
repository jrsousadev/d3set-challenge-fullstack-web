import { CssBaseline } from "@mui/material";
import { AppProps } from "next/app";
import { Content, GlobalStyle } from "../../styles/global";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CssBaseline />
      <GlobalStyle />
      <div style={{ position: "absolute", top: "0", right: "0" }}>
        <ToastContainer />
      </div>
      <Header />
      <Content>
        <Component {...pageProps} />
      </Content>
    </LocalizationProvider>
  );
}

export default MyApp;
