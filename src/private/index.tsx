import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/context";
import { useNavigate } from "react-router-dom";
import LoadingIcons from "react-loading-icons";

interface ChildrenProps {
  children: ReactNode;
}

export function Private({ children }: ChildrenProps): any {
  const navigate = useNavigate();
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return;
    <div>
      <LoadingIcons.Bars />
    </div>;
  }

  if (!signed) {
    return navigate("/login");
  }

  return children;
}
