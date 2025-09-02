import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";
export default function DefaultLayout(){
    return (
        <div>
            <Header/>
            <main>
                {/* <LoadingPage/> */}
                <ScrollToTop/>
                <Outlet />
            </main>
            <Footer/>
        </div>
  );
}