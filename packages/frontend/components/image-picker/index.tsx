import { ComponentProps, useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TiDeleteOutline } from "react-icons/ti";
import Button from "../button";
import Image from "next/image";

type Props = ComponentProps<"input"> & {
  label: string;
  errors?: FieldErrors;
  register?: UseFormRegister<any>;
  onChange: (files: File[]) => void;
};

function ImagePicker({ label, errors, register, onChange, ...props }: Props) {
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function triggerFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    if (event.target.files?.length === 0) return;

    for (const file of Array.from(event.target.files)) {
      setFiles((files) => [...files, file]);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target || !event.target.result) return;

        setImagePreviewUrls((images) => [
          ...images,
          event.target!.result as string,
        ]);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage(index: number) {
    setImagePreviewUrls((images) => images.filter((_, i) => i !== index));
    setFiles((files) => files.filter((_, i) => i !== index));
  }

  useEffect(() => {
    onChange(files);
  }, [files]);

  return (
    <div className="flex flex-col gap-2">
      <label>
        {label}
        <input
          {...(props.name && register && register(props.name))}
          {...props}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
          value=""
        />
      </label>
      <div className="grid grid-cols-2 border-dashed border-2 items-center">
        {imagePreviewUrls.map((image, index) => (
          <div
            key={index}
            className="relative h-60 w-full flex flex-col items-end"
          >
            <button
              onClick={() => removeImage(index)}
              className="relative z-10 text-4xl text-white m-1"
            >
              <TiDeleteOutline />
            </button>
            <Image
              src={image}
              alt="Preview"
              fill
              className="m-0 p-1 rounded-lg object-contain"
            />
          </div>
        ))}
        <div className="mx-2 h-40 flex justify-center items-center">
          <Button
            type="button"
            importance="secondary"
            extraClassName=""
            onClick={triggerFilePicker}
          >
            Add a photo
          </Button>
        </div>
      </div>
      {errors && props.name && (
        <ErrorMessage name={props.name} errors={errors} />
      )}
    </div>
  );
}

export default ImagePicker;
