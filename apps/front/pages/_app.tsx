import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo, UserApiPath } from "opm-models";
import { useEffect } from "react";
import { useRouter } from "next/router";

import useWindowSize from "../hooks/useWindowSize";
import Error from "../components/common/Error";
import wrapper, { RootState } from "../store";
import { Api } from "../helpers/api";
import { login } from "../store/slice/user";

const allowedPaths = ["/", "/posts", "/board", "/login"];

function MyApp({ Component, pageProps }: AppProps) {
  const [width, height] = useWindowSize();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector<RootState, UserInfo>((state) => state.user);

  useEffect(() => {
    if (user.uId || router.pathname === "/login") return;
    const getAuthToken = async () => {
      const res = await Api.get(UserApiPath.authCheck);
      if (res.ok) {
        const { data } = await res.json();
        dispatch(login(data));
        return;
      }
      if (allowedPaths.includes(router.pathname)) return;
      router.push("/login");
    };
    getAuthToken();
  }, [user.uId, router, dispatch]);

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
