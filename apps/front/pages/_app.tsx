import "../styles/globals.scss";
import type { AppProps } from "next/app";

import useWindowSize from "../hooks/useWindowSize";
import Error from "../components/common/Error";
import wrapper from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  const [width, height] = useWindowSize();

  if (process?.env?.NODE_ENV === "development") {
    return <Component {...pageProps} />;
  }

  return width < 1240 ? (
    <Error
      title="For Crystal-clear proofreading."
      description="Proofor works on only PC Website."
    />
  ) : (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(MyApp);
