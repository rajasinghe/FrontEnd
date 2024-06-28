import { useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";

type NavBarContext = {
  navBarInfo: DOMRect | null;
};

function App() {
  return <Outlet />;
}

export const useNavBarInfo = () => {
  return useOutletContext<NavBarContext>();
};

export default App;
