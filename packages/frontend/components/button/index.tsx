import classNames from "classnames";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  importance?: "primary" | "secondary";
  extraClassName?: string;
  isLoading?: boolean;
};

function Button({
  importance,
  extraClassName,
  isLoading,
  children,
  ...props
}: Props) {
  const importanceClass =
    importance === "secondary" ? "btn-secondary" : "btn-primary";

  return (
    <button
      {...props}
      className={`${classNames("btn ", importanceClass, extraClassName)}`}
    >
      {isLoading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}

export default Button;
