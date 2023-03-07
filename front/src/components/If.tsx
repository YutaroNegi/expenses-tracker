import { FC } from "react";

type Props = {
  condition: boolean;
  children: JSX.Element;
};

export const If : FC<Props> = ({ condition, children }) => {
  if (condition) {
    return children;
  } else {
    return null;
  }
};
