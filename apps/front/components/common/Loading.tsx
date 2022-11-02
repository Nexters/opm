import Image from "next/image";
import { FunctionComponent } from "react";

import Navigation from "./Navigation";

interface LoadingProps {
  width?: string;
  height?: string;
  position?: NonNullable<JSX.IntrinsicElements["div"]["style"]>["position"];
  top?: NonNullable<JSX.IntrinsicElements["div"]["style"]>["top"];
  left?: NonNullable<JSX.IntrinsicElements["div"]["style"]>["left"];
}

const Loading: FunctionComponent<LoadingProps> = ({
  width = "300px",
  height = "300px",
  position = "relative",
  top = "auto",
  left = "auto",
}) => {
  return (
    <>
      {/* <Navigation /> */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width, height, position, top, left }}>
          <Image src="/loading.gif" layout="fill" alt="loading" />
        </div>
      </div>
    </>
  );
};

export default Loading;
