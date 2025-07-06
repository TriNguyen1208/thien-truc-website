import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Button } from "antd";

// Fake page content
const ManagerTable = () => (
  <div>
    <p className="text-gray-800">Nội dung bảng quản lý manager sẽ hiển thị tại đây.</p>
  </div>
);

export default function App() {
  const layoutProps = {
    title: "Quản lý Manager",
    description: "Quản lý tài khoản của các Manager",
    hasButton: true,
    buttonLabel: "Thêm Manager",
    buttonAction: () => {
      console.log("Thêm Manager button clicked");
      // Logic to handle adding a new manager can be added here
    },
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout {...layoutProps} />}>
          <Route path="/" element={<ManagerTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
