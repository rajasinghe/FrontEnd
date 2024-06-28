import ItemCard from "../ItemCard/ItemCard";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Paginator from "../Paginator/Paginator";

interface item {
  id: number;
  product_name: string;
  description: string;
  price: number;
  rating: number;
  country: string;
  imgPath: string;
}

function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<item[]>([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPagecount] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    displayProducts();
  }, [page]);

  const displayProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts(abortControllerRef, page);
      const products = response.chunk;
      setPagecount(response.chunksCount);
      setItems(products);
      setIsLoading(false);
      setError(false);
    } catch (e: any) {
      if (e.name === "AbortError") {
        console.log("Aborted");
        return;
      }
      setError(true);
    }
  };

  if (error) {
    return (
      <>
        {/* <button className="btn btn-primary " onClick={}>
          get Products
        </button> */}
        ;<div>Something went wrong</div>;
      </>
    );
  }

  return (
    <div className="">
      <div className="section-heading display-3">Latest Arrivals</div>
      <div className="container-fluid">
        {isLoading && <div>Loading plz wait</div>}
        {!isLoading && (
          <div className="row px-1">
            {items.map((item) => {
              return (
                <ItemCard
                  image={"http://localhost:3000" + item.imgPath}
                  itemName={item.product_name}
                  itemPrice={item.price + ""}
                  itemRating={item.rating}
                  country={item.country}
                  status="available"
                  key={item.id}
                />
              );
            })}
          </div>
        )}
        <Paginator pageSetter={setPage} page={page} pageCount={pageCount} />
      </div>
    </div>
  );
}

async function getProducts(
  abortControllerRef: MutableRefObject<AbortController | null>,
  page?: number
): Promise<Array<Object> | boolean | any> {
  try {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const resposne = await fetch(`http://localhost:3000/api/products/?page=${page}`, {
      signal: abortControllerRef.current?.signal,
    });
    const data = await resposne.json();

    if (!resposne.ok) {
      throw new Error(data.msg || "error in the response");
    }

    console.log(data);
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}

export default ProductsPage;
