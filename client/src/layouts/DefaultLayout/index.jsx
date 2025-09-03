import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";
export default function DefaultLayout(){
    return (
        <div>
            <Header/>
            <main>
                <ScrollToTop/>
                <Outlet />
            </main>
            <Footer/>
        </div>
  );
}