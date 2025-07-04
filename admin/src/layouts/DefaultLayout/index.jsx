import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sider from "@/components/Sider";
import { Outlet } from "react-router-dom";
export default function DefaultLayout() {
    return (
        <div className="grid grid-cols-24">
            <div className="col-span-5">
                <Sider />
            </div>
            <div className="col-span-19">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
