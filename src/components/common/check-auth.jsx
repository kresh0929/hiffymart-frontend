import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  console.log("🛂 CheckAuth", { path, isAuthenticated, user });

  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/shop/home" />;
  }

  if (
    !isAuthenticated &&
    !(path.startsWith("/auth/login") || path.startsWith("/auth/register"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (path.startsWith("/auth/login") || path.startsWith("/auth/register"))
  ) {
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/shop/home" />;
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    path.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    path.startsWith("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
