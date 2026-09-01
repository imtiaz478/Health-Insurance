import { Outlet } from "react-router";
import Footer from "~/component/Footer";
import Navbar from "~/component/Navbar";
import TopBar from "~/component/TopBar";

export default function MainLayout() {
  return (
    <>
      <div>
        <TopBar></TopBar>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
}