import { ComponentProps } from "react";
import classNames from "classnames";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Props = ComponentProps<"textarea"> & {
  label: string;
  errors?: FieldErrors;
  register?: UseFormRegister<any>;
};

function TextArea({ label, errors, register, ...props }: Props) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24 max-w-2xl"
        {...(props.name && register && register(props.name))}
        {...props}
      ></textarea>
      {errors && props.name && (
        <ErrorMessage name={props.name} errors={errors} />
      )}
    </label>
  );
}

export default TextArea;
