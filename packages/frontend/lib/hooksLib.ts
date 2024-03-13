import { useState, ChangeEvent, ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import { z } from "zod";

interface FieldsType {
  [key: string | symbol]: string;
}

export function useFormFields(
  initialState: FieldsType
): [FieldsType, ChangeEventHandler] {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event: ChangeEvent<HTMLInputElement>) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
      return;
    },
  ];
}

export const useTypedRouter = <T extends z.Schema>(schema: T) => {
  const { query, ...router } = useRouter();

  return {
    query: schema.parse(query) as z.infer<typeof schema>,
    ...router,
  };
};
