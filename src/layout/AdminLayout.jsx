import { Outlet, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return <Spinner />;

  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mx-auto mt-10 px-10">
        <Outlet />
        </main>
      ): (
        <Navigate to='/' />
      )}
      <Footer />
    </>
  );
};

export default AdminLayout;
