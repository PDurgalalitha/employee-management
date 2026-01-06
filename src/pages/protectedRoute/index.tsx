import { Navigate, Outlet } from "react-router-dom";
import { routes, USER } from "../../constants.ts";
import { Header } from "../../components/header/index.tsx";

const useAuth = () => {
  const user = localStorage.getItem(USER); // Check if user is logged in
  return { loggedIn: !!user };
};

// Protected Route Component
export const ProtectedRoute: React.FC<any> = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.login} replace />;
};

export const ProtectedLayout: React.FC = ()=>{
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Child routes like /dashboard render here */}
      </main>
    </>
  );
}