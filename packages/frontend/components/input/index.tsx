import { ComponentProps } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Props = ComponentProps<"input"> & {
  label: string;
  errors?: FieldErrors;
  register?: UseFormRegister<any>;
};

function Input({ label, errors, register, ...props }: Props) {
  return (
    <div>
      <label className="input input-bordered flex items-center max-w-md gap-2">
        {label}
        <input
          {...(props.name && register && register(props.name))}
          className="grow"
        />
      </label>
      {errors && props.name && (
        <ErrorMessage name={props.name} errors={errors} />
      )}
    </div>
  );
}

export default Input;
