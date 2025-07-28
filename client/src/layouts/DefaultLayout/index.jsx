import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage";
export default function DefaultLayout(){
    return (
        <div>
            <Header/>
            <main>
                <LoadingPage/>
                <Outlet />
            </main>
            <Footer/>
        </div>
  );
}