import style from "./Container.module.scss";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className={style.container}>{children}</div>;
};
