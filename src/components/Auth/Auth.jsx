import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Auth({ children }) {
  const token = useSelector((state) => state.user.token);
  if (token) return children;
  return <Navigate to="/" />;
}

export default Auth;
