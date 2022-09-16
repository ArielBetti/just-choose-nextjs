import Head from "next/head";
import Link from "next/link";
import { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "../components/GlobalStyles";
import { theme } from "../theme/index";
import "react-toastify/dist/ReactToastify.min.css";
import "react-loading-skeleton/dist/skeleton.css";

import { Container } from "../components/Atoms/Container";
import { AppToastContainer } from "../components/Atoms/atoms";
const defaultTheme: DefaultTheme = theme;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AppToastContainer
        progressStyle={{ background: theme?.colors?.primary }}
        theme="dark"
        autoClose={2500}
      />
      <Head>
        <title>JustChoose</title>
      </Head>
      <Container>
        <Link href="/">
          <h3 style={{ cursor: "pointer" }}>{"<JustChoose/>"}</h3>
        </Link>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;
