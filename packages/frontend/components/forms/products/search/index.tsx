import { FormEvent } from "react";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import Input from "@/components/input";
import Button from "@/components/button";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";

export interface FormValues {
  searchQuery: string;
}

export function SearchProductNavForm() {
  const {
    formState: { isValid, errors },
    register,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const values = getValues();

      router.push(`/products?searchQuery=${values.searchQuery}`);
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormContent isValid={isValid} errors={errors} register={register} />
    </form>
  );
}

export function FormContent({
  isValid,
  errors,
  register,
}: {
  isValid: boolean;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Input
        label=""
        name="searchQuery"
        errors={errors}
        register={register}
        placeholder="e.g. blue converse"
      />
      <Button
        type="submit"
        importance="secondary"
        extraClassName="px-4"
        disabled={!isValid}
      >
        <span className="sr-only">Search</span>
        <CiSearch className="text-xl" />
      </Button>
    </div>
  );
}
