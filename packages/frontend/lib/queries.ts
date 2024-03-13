import { useMutation } from "@tanstack/react-query";

export function useFetchQuery() {
  const mutation = useMutation({
    mutationFn: ({
      input,
      init,
    }: {
      input: string | URL | Request;
      init?: RequestInit | undefined;
    }) => {
      return fetch(input, init);
    },
  });
  return mutation;
}
