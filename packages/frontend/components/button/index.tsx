import { ComponentProps } from "react";

type Props = ComponentProps<"button">;

function Button(props: Props) {
  return <button {...props} className="btn btn-primary" />;
}

export default Button;
