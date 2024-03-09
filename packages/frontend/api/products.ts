import { API } from "aws-amplify";

export const getProducts = () => API.get("products", `/products`, {});
export const getProduct = (id: string) =>
  API.get("products", `/products/${id}`, {});

export const createProduct = (body: any) =>
  API.post("products", `/products`, { body });
