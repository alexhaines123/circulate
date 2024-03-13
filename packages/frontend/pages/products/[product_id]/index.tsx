import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { useTypedRouter } from "@/lib/hooksLib";
import ProductDetail from "@/components/product/product-detail";

const routerSchema = z.object({
  product_id: z.coerce.string(),
});

function ProductPage() {
  const router = useTypedRouter(routerSchema);
  const { product_id } = router.query;

  const product = trpc.products.productGet.useQuery({ product_id });

  return <div>{product.data && <ProductDetail {...product.data} />}</div>;
}

export default ProductPage;
