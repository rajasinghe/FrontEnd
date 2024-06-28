import { ContextType, useEffect } from "react";
import LoginComponenet from "./LoginComponent/LoginComponent";
import { useNavBarInfo } from "../../App";
import { Link } from "react-router-dom";
function LoginPage() {
  //this is the context which is setted from
  const { navBarInfo } = useNavBarInfo();

  useEffect(() => {
    console.log("initial render of the LoginPage Component");
    console.log(navBarInfo);
  });

  useEffect(() => {
    console.log(navBarInfo?.height);
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center pt-5">
      <LoginComponenet className=" mt-auto mb-auto " />
      <div className=" ">New To Nova Dynamics?</div>
      <Link to={""} className="">
        Create an account
      </Link>
    </div>
  );
}

export default LoginPage;
