import { ImgHTMLAttributes, ReactNode } from "react";
import homeImage from "../../../assets/navbarIcons/icons8-home-128 (1).png";

function SideNavBar() {
  return (
    <section>
      <ul>
        <SideBarItem>Home</SideBarItem>
      </ul>
    </section>
  );
}

interface navbarItemProps {
  children: ReactNode;
  iconPath?: ImgHTMLAttributes<HTMLImageElement>;
}
function SideBarItem({ iconPath, children }: navbarItemProps) {
  return (
    <li className=" d-flex">
      {iconPath ? <img src={""} alt={""} /> : null}
      {children}
    </li>
  );
}

export default SideNavBar;
