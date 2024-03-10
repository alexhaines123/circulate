import { zfd } from "zod-form-data";
import { z } from "zod";

export const formSchema = zfd.formData({
  title: zfd.text(z.string().min(2, "Too short").max(40, "Too long")),
  description: zfd.text(z.string().min(10, "Too short")),
  price: zfd.numeric(),
});
