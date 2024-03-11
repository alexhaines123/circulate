import { getProduct, getProducts } from "@/api/products";

function ProductPage({ products }: { products: any }) {
  return (
    <div>
      <h1>Products</h1>
      {products.map((product: any) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;

// export async function getServerSideProps() {
//   const product = await getProduct();
//   return {
//     props: {
//       product,
//     },
//   };
// }
