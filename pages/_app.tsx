import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import useThemeDetector from "../hooks/useThemeDetector";

import Head from "next/head";
import Link from "next/link";
import { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "../components/GlobalStyles";
import selectTheme from "../theme";

// css
import "react-toastify/dist/ReactToastify.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "nprogress/nprogress.css";

import { Container } from "../components/Atoms/Container";
import { AppToastContainer, FlexBox } from "../components/Atoms/atoms";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/router";
import NProgress from "nprogress";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDarkTheme = useThemeDetector();

  // theme changer
  const theme: DefaultTheme = isDarkTheme
    ? selectTheme("dark")
    : selectTheme("ligth");

  useEffect(() => {
    const handleStart = (_url: string) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
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
          <FlexBox direction="column" align="flex-start" justify="flex-start">
            <h2>Apoie o criador:</h2>
            <FlexBox
              direction="row"
              align="flex-start"
              justify="flex-start"
              gap="sm"
            >
              <a target="_blank" href="https://github.com/ArielBetti">
                <FaGithub cursor="pointer" size="30px" />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/ariel-betti/"
              >
                <FaLinkedinIn cursor="pointer" size="30px" />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCXCyTeW1V33Ki4PyMLCn2zg"
              >
                <FaYoutube cursor="pointer" size="30px" />
              </a>
            </FlexBox>
          </FlexBox>
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
