import React from 'react'
import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import SimpleForm from '../../components/SimpleForm'
import SearchBar from '../../components/Search'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import useProduct from "../../hooks/useProducts";
import ColorBlock from '../../components/ColorBlock';
import Table from "../../components/Table"
import { DeleteIcon, EditIcon, SettingIcon } from "../../components/Icon"
import { CancelPopup } from '../../components/Popup'
import Setting from '../../components/Setting';
import useProducts from '../../hooks/useProducts';
import useProjects from '../../hooks/useProjects';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Loading from '@/components/Loading'
const ProductCategories = () => {
  const queryClient = useQueryClient();
  const { setLayoutProps } = useLayout()
  useEffect(() => {
    setLayoutProps({
      title: "Quản lý sản phẩm",
      description: "Quản lý danh sách sản phẩm",
      hasButton: true,
      buttonLabel: "Thêm sản phẩm",
      buttonAction: () => {
        console.log("Open button")
        setIsModalOpenAddProductCategories(true);
      }
    })
  }, []);

  // ========= PRODUCT CATEGORIES ================= 
  const [productCategoriesToDelete, setProductCategoriesToDelete] = useState(null);
  const [isModalOpenAddProductCategories, setIsModalOpenAddProductCategories] = useState(false);
  const [isModalOpenEditProductCategories, setIsModalOpenEditProductCategories] = useState(false);
  const [isModalOpenSetting, setIsModalOpenSetting] = useState(false);
  const [idCurrentEditProductCategories, setIdCurrentEditProductCategories] = useState(null);
  const [openCancel, setOpenCancel] = useState(false);
  const [dataEditProductCategories, setDataEditProductCategories] = useState([
    { name: 'productNameCategories', label: 'Tên loại sản phẩm', type: 'text', width: 12, isRequired: true },
  ]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [contentSetting, setContentSetting] = useState({
    title: `Quản lý danh sách sản phẩm `,
    description: `Chọn các sản phẩm muốn thêm hoặc xóa  khỏi danh mục`,
    type: "sản phẩm",
    header: [
      "Mã sản phẩm",
      "Tên sản phẩm",
      "Danh mục",
    ]
  });

  const { data: productCategoriesData, isLoading: isLoadingProductCategoriesData } = useProducts.product_categories.getAll();
  const { mutate: updateOneProductCategories, isLoading: isLoadingUpdateProductCategories } = useProducts.product_categories.updateOne();
  const { mutate: createOneProductCategories, isLoading: isLoadingCreateOneProductCategories } = useProducts.product_categories.createOne();
  const { mutate: deleteOneProductCategories, isLoading: isLoadingDeleteOneProductCategories } = useProducts.product_categories.deleteOne();
  const { mutateAsync: updateCategory } = useProduct.products.updateCategory();
  if (isLoadingProductCategoriesData || isLoadingUpdateProductCategories || isLoadingCreateOneProductCategories || isLoadingDeleteOneProductCategories) {
    return (
      <Loading/>
    )
  }
  console.log(productCategoriesData);

  const handleSubmitButtonAddProductCategories = (valueForm) => {
    console.log('Day la button submit', valueForm)
    createOneProductCategories(valueForm);
    setIsModalOpenAddProductCategories(false)
  }
  const handleCancelButtonAddProductCategories = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddProductCategories(false)
  }
  const handleSubmitButtonEditProductCategories = (valueForm) => {
    console.log('Day la button submit', valueForm)
    updateOneProductCategories({
      id: idCurrentEditProductCategories,
      data: valueForm
    })
    setIsModalOpenEditProductCategories(false)
  }
  const handleCancelButtonEditProductCategories = () => {
    console.log('Day la button cancle')
    setIsModalOpenEditProductCategories(false)
  }
  const configProductCategories = {
    title: "Danh sách loại sản phẩm",
    description: `Tổng cộng ${productCategoriesData.length} loại sản phẩm`,
    form: {
      configAdd: {
        title: "Tạo loại sản phẩm mới",
        description: "Thêm loại sản phẩm mới",
        contentCancelButton: "Hủy",
        contentSubmitButton: "Thêm mới",
        widthModal: 550,
        isModalOpenSimple: isModalOpenAddProductCategories,
        handleSubmitButton: handleSubmitButtonAddProductCategories,
        handleCancelButton: handleCancelButtonAddProductCategories,
        setIsModalOpenSimple: setIsModalOpenAddProductCategories,
      },
      configEdit: {
        title: "Cập nhật loại sản phẩm",
        description: "Cập nhật loại sản phẩm ",
        contentCancelButton: "Hủy",
        contentSubmitButton: "Cập nhật",
        widthModal: 550,
        isModalOpenSimple: isModalOpenEditProductCategories,
        handleSubmitButton: handleSubmitButtonEditProductCategories,
        handleCancelButton: handleCancelButtonEditProductCategories,
        setIsModalOpenSimple: setIsModalOpenEditProductCategories,
      },
      dataAdd: [
        { name: 'productNameCategories', label: 'Tên loại sản phẩm', type: 'text', width: 12, isRequired: true },
      ],
    },
    data: productCategoriesData,
    table: {
      columns: ["Số TT", "Tên loại sản phẩm", "Số lượng", "Thao tác"]
    }
  }


  const handleEnter = (id) => {
    console.log(id);
  }
  const categories = ["Tất cả danh mục", "Điện thoại", "Máy tính", "Phụ kiện"];
  const displays = ["Tất cả trạng thái", "Đang hoạt động", "Ngừng kinh doanh"];
  const handleSearch = (query, category, display) => {
    console.log(query, category, display)
  }
  const handleSearchSuggestion = (query) => {
    return useProduct.getSearchSuggestions(query);
  }
  const dataSearch = {
    hasButtonCategory: false,
    hasButtonDisplay: false,
    categories: categories,
    displays: displays,
    currentCategory: categories[0],
    currentDisplay: displays[0],
    placeholder: "Tìm kiếm theo tên sản phẩm hoặc mã sản phẩm",
    handleEnter: handleEnter,
    onSearch: handleSearch,
    handleSearchSuggestion: handleSearchSuggestion, //co 3 tham so la query, category = null, display = null,
  }


  const convertProductCategoriesListToTableData = (productCategoriesList) => {
    return productCategoriesList.map((productCategories, index) => {
      return [
        { type: "text", content: `${index + 1}` }, // STT
        {
          type: "text",
          content: `${productCategories.name}`
        },
        {
          type: "text",
          content: `${productCategories.item_count}`
        },
        {
          type: "array-components",
          components: [
            <button
              className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
              onClick={() => {
                setSelectedCategoryId(productCategories.id);
                setContentSetting(prev => ({
                  ...prev,
                  category: productCategories.name
                }));
                setIsModalOpenSetting(true);

              }
              }
            >
              <SettingIcon />
            </button>,
            <button
              className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
              onClick={() => handleEditButton(productCategories)}
            >
              <EditIcon />
            </button>,
            <button
              className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
              onClick={() => {
                setProductCategoriesToDelete(productCategories);
                setOpenCancel(true)
              }
              }
            >
              <DeleteIcon />
            </button>,
          ],
        },
      ];
    });
  };

  const handleEditButton = (item) => {

    const updatedForm = [
      { ...dataEditProductCategories[0], value: item.name },

    ];
    setDataEditProductCategories(updatedForm);
    console.log(item.id, item, updatedForm);
    setIdCurrentEditProductCategories(item.id);
    setIsModalOpenEditProductCategories(true);
    console.log(dataEditProductCategories);
  }
  const dataTable = convertProductCategoriesListToTableData(configProductCategories.data);

  return (
    <>
      <div className="bg-white px-6 py-6 rounded-lg shadow-sm border border-gray-200  mb-[25px]">
        <SearchBar data={dataSearch} />
      </div>
      <div className="bg-white px-6 py-6 rounded-lg shadow-sm border border-gray-200  mb-[25px]">
        <div className='text-[30px] font-[600] mb-[5px]'>
          {configProductCategories.title}
        </div>
        <div className='text-gray-600 mb-[30px]'>
          {configProductCategories.description}
        </div>
        <Table columns={configProductCategories.table.columns} data={dataTable} isSetting={false} />

      </div>


      <SimpleForm data={dataEditProductCategories} config={configProductCategories.form.configEdit} />
      <SimpleForm data={configProductCategories.form.dataAdd} config={configProductCategories.form.configAdd} />
      <CancelPopup
        open={openCancel}
        setOpen={setOpenCancel}
        notification="Xác nhận xóa"
        subTitle={`Bạn có chắc muốn xoá loại sản phẩm "${productCategoriesToDelete?.name}" không?`}
        buttonAction2={() => {
          if (productCategoriesToDelete) {
            deleteOneProductCategories(productCategoriesToDelete.id);
            setOpenCancel(false);
          }
        }}
      />
      <Setting
        isOpen={isModalOpenSetting}
        onClose={() => setIsModalOpenSetting(false)}
        content={contentSetting}
        useData={useProduct.products}
        useDataSuggestion={useProduct}
        useDataCategories={useProduct.product_categories}
        onSave={async (changedItems) => {
          // Map từ { id, state } -> { id, category_id }
          const mappedItems = changedItems
            .map(item => ({
              id: item.id,
              category_id: selectedCategoryId
            }));

          try {
            await updateCategory({ changedItems: mappedItems });
            toast.success("Cập nhật khu vực thành công");
            queryClient.invalidateQueries(['admin_product_list']);
          } catch (err) {
            toast.error("Cập nhật khu vực thất bại");
            console.error("Lỗi khi cập nhật:", err);
          }
        }} />
    </>
  )
}


export default ProductCategories