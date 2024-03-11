import { getProducts } from "@/api/products";
import Image from "next/image";

function ProductPage({ products }: { products: any }) {
  return (
    <div>
      <h1>Products</h1>
      {products.map((product: any) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>
            {product.product_images.map((image: any) => (
              <div className="relative w-20 h-20">
                <Image
                  key={image.product_image_id}
                  src={image.key}
                  alt={product.title}
                  fill
                />
              </div>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;

export async function getServerSideProps() {
  const products = await getProducts();
  console.log(products);
  return {
    props: {
      products,
    },
  };
}
