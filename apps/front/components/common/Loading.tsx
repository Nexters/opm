import Image from "next/image";
import { FunctionComponent } from "react";

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
    <div style={{ width, height, position, top, left }}>
      <Image src="/loading.gif" layout="fill" alt="loading" />
    </div>
  );
};

export default Loading;
