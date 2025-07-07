import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sider from "@/components/Sider";
import { Outlet } from "react-router-dom";
import CustomButton from "@/components/ButtonLayout";
import { PlusOutlined } from "@ant-design/icons";

export default function DefaultLayout({ title, description, hasButton, buttonLabel, buttonAction = () => {}, }) {
  return (
     <div className="flex h-screen overflow-hidden">
      {/* SIDER */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
        <Sider />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-100 py-25 pr-6 pl-7">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="text-gray-500 text-[17px] mt-1">{description}</p>
              )}
            </div>
            {hasButton &&  (<CustomButton
                icon={<PlusOutlined />}
                onClick={buttonAction}
                backgroundColor="#000"
                borderColor="#000"
                textColor="#fff"
                height={40}
             >
                {buttonLabel}
            </CustomButton>
            )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <Outlet />
            </div>
        </main>
        {/* <Footer /> nếu cần */}
      </div>
    </div>
  );
}
