import { useEffect } from "react";
import testImage from "../../assets/images/robotic-equipment-industrial-background-vector-16631660.jpg";
import styles from "./itemCard.module.css";
interface props {
  itemName: string;
  itemRating: number;
  itemPrice: string;
  status: string;
  country: string;
  image?: string | null;
}
function ItemCard(props: props) {
  useEffect(() => {
    console.log(image);
  });

  const { itemName, itemRating, itemPrice, status, country, image } = props;
  return (
    <div className="p-2  col-12  col-sm-6 col-md-4 col-lg-3">
      <div className={`${styles["item-card"]} p-2`}>
        <img src={image || testImage} alt="" />
        <div className={`${styles["item-heading"]} fs-3 fw-semibold`}>{itemName}</div>
        <div className="d-flex ">
          <div className="">
            {Array.from({ length: itemRating }).map((_, index: any) => {
              return <i className="bi bi-star-fill" key={index + "star"}></i>;
            })}

            {Array.from({ length: 5 - itemRating }).map((_, index: any) => {
              return <i className="bi bi-star" key={index + "half-star"}></i>;
            })}
          </div>
          <div className="d-flex ms-auto ">
            <div className="me-1"></div>
            {status}
          </div>
        </div>
        <div className="d-flex align-items-baseline ">
          <div className=" justify-content-center fw-bolder fs-6 me-1 ">LKR</div>
          <div className="ms-1 fs-1">{itemPrice}</div>
        </div>
        <div className="">{country}</div>
      </div>
    </div>
  );
}

export default ItemCard;
