import { ReactNode } from "react";
import styles from "./Paginator.module.css";

interface Paginator {
  pageSetter: (page: number) => void;
  page: number;
  pageCount: number;
}

function Paginator({ pageSetter, page, pageCount }: Paginator) {
  const pages = 5;

  const setPage = (page: number) => {
    pageSetter(page);
  };

  return (
    <div className=" d-flex ">
      {Array.from({ length: pageCount }).map((_, index: number) => {
        const status = page == index;
        return (
          <Box
            setSelected={setPage}
            status={status}
            key={"box" + index}
            index={index}
          >
            {index + 1}
          </Box>
        );
      })}
    </div>
  );
}

interface BoxProps {
  children: ReactNode;
  status?: boolean;
  setSelected: (page: number) => void;
  index: number;
}

const Box = ({ children, status, setSelected, index }: BoxProps) => {
  const className = `${styles.pageBox} ${status ? styles.active : ""}`;
  const handleClick = () => {
    setSelected(index);
  };
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Paginator;
