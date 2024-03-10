import classNames from "classnames";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  importance?: "primary" | "secondary";
  extraClassName?: string;
};

function Button({ importance, extraClassName, ...props }: Props) {
  const importanceClass =
    importance === "secondary" ? "btn-secondary" : "btn-primary";

  return (
    <button
      {...props}
      className={`${classNames("btn ", importanceClass, extraClassName)}`}
    />
  );
}

export default Button;
