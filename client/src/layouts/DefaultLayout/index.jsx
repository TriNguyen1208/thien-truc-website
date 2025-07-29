import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage";
import ScrollToTop from "../../components/ScrollToTop";
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