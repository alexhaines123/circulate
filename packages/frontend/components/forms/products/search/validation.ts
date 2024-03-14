import { zfd } from "zod-form-data";
import { z } from "zod";

export const formSchema = zfd.formData({
  query: zfd.text(z.string().optional()).optional(),
});
