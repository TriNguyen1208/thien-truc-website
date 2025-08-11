import Header from "@/components/Header";
import Sider from "@/components/Sider";
import { Outlet } from "react-router-dom";
import CustomButton from "@/components/ButtonLayout";
import { PlusOutlined, ArrowLeftOutlined} from "@ant-design/icons";
import { useLayout } from "@/layouts/LayoutContext";
import { useNavigate } from "react-router-dom";
import { useNavigationGuardContext } from "../NavigatorProvider";
import useNavigationGuard from "../../hooks/useNavigationGuard";
import SwitchButton from "../../components/SwitchButton";

export default function DefaultLayout({ children }) {

const { layoutProps } = useLayout() ?? {};
const {
  title = '',
  description = '',
  hasButton = false,
  hasButtonBack = false,
  buttonLabel = '',
  buttonAction = () => {},
  buttonToggle = null
} = layoutProps ?? {};
  const navigate = useNavigate();
  const {shouldWarn} = useNavigationGuardContext() ?? {};
  const modal = useNavigationGuard(shouldWarn);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDER */}
      <div className="w-65 flex-shrink-0  bg-white border-r border-gray-200 overflow-y-auto z-10">
        <Sider />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden ">
        <Header />
        <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-100 py-13 pr-6 pl-7 scroll-wrapper">
          <div className="flex justify-between items-center mb-4 ">
             <div className="flex items-center gap-3">
              {hasButtonBack && (
                <CustomButton
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate(-1)}
                  backgroundColor="#fff"
                  borderColor="#ccc"
                  textColor="#000"
                  height={40}
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                {description && (
                  <p className="text-gray-500 text-[17px] mt-1">{description}</p>
                )}
              </div>
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
            {buttonToggle && (
              <div className="flex flex-row gap-5 items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">Hiển thị công khai nội dung trang</span>
                  <span className="text-gray-500 ">Có thể tạm tắt khi cập nhật</span>
                </div>
                <SwitchButton 
                  handleToggle={buttonToggle.handleToggle}
                  currentState={buttonToggle.currentState}
                />
              </div>
            )}
            </div>
            <div className="bg-gray-100 ">
              <Outlet />
            </div>
        </main>
        {/* <Footer /> nếu cần */}
      </div>
      {modal}
    </div>
  );
}
