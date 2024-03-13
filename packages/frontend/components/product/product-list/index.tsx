import ProductListItem from "./product-list-item";

type Props = {
  products: {
    title: string;
    description: string;
    price: number;
    product_images: {
      key: string;
      product_image_id: string;
    }[];
    product_id: string;
  }[];
};

function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductListItem key={product.product_id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
