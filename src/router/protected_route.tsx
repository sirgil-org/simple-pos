import { useCurrentUser } from "../contexts";
import { Redirect } from "react-router";

function ProtectedRoute({ children }) {
  const { currentUser } = useCurrentUser();
  if (!currentUser) return <Redirect to="/login" />;

  return <>{children}</>;
}

export default ProtectedRoute;
