import React from 'react'
import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect, useRef } from "react"
import SimpleForm from '../../components/SimpleForm'
import SearchBar from '../../components/Search'
import { useState } from 'react';
import useProduct from "../../hooks/useProducts";
import Table from "../../components/Table"
import { DeleteIcon, EditIcon, SettingIcon } from "../../components/Icon"
import Notification from '@/components/Notification'
import Setting from '../../components/Setting';
import useProducts from '../../hooks/useProducts';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Loading from '@/components/Loading'
import { useSearchParams } from 'react-router-dom';
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
        setIsModalOpenAddProductCategories(true);
      }
    })
  }, []);
  const searchSettingRef = useRef({
      query: "",
      category: "Tất cả loại",
      display: "Tất cả trạng thái"
  })
  // ========= PRODUCT CATEGORIES ================= 
  const [productCategoriesToDelete, setProductCategoriesToDelete] = useState(null);
  const [isModalOpenAddProductCategories, setIsModalOpenAddProductCategories] = useState(false);
  const [isModalOpenEditProductCategories, setIsModalOpenEditProductCategories] = useState(false);
  const [isModalOpenSetting, setIsModalOpenSetting] = useState(false);
  const [idCurrentEditProductCategories, setIdCurrentEditProductCategories] = useState(null);
  const [openNotificaiton, setOpenNotificaiton] = useState(false);
  const [dataEditProductCategories, setDataEditProductCategories] = useState([
    { name: 'productNameCategories', label: 'Tên loại sản phẩm', type: 'text', width: 12, isRequired: true, maxLength: 300 },
  ]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [contentSetting, setContentSetting] = useState({
    title: `Quản lý danh sách sản phẩm `,
    description: `Chọn các sản phẩm muốn thêm hoặc xóa  khỏi danh mục`,
    type: "sản phẩm",
    category: "",
    category_id: "",
    header: [
      "Mã sản phẩm",
      "Tên sản phẩm",
      "Danh mục",
    ]
  });
  const [searchParams, setSearchParams] = useSearchParams();
  var query = searchParams.get('query') || undefined;
  var id = searchParams.get('id') || undefined;

  const { data: productCategoriesData, isLoading: isLoadingProductCategoriesData } = useProducts.product_categories.getAll(id, query);
  const { mutate: updateOneProductCategories, isPending: isPendingUpdateProductCategories } = useProducts.product_categories.updateOne();
  const { mutate: createOneProductCategories, isPending: isPendingCreateOneProductCategories } = useProducts.product_categories.createOne();
  const { mutate: deleteOneProductCategories, isPending: isPendingDeleteOneProductCategories } = useProducts.product_categories.deleteOne();
  const { mutateAsync: updateCategory, isPending: isPendingUpdateCategory } = useProduct.products.updateCategory();
  if (isLoadingProductCategoriesData || isPendingUpdateProductCategories || isPendingCreateOneProductCategories || isPendingDeleteOneProductCategories || isPendingUpdateCategory) {
    return (
      <Loading/>
    )
  }

  const handleSubmitButtonAddProductCategories = (valueForm) => {
    createOneProductCategories(valueForm);
    setIsModalOpenAddProductCategories(false)
  }
  const handleCancelButtonAddProductCategories = () => {
    setIsModalOpenAddProductCategories(false)
  }
  const handleSubmitButtonEditProductCategories = (valueForm) => {
    updateOneProductCategories({
      id: idCurrentEditProductCategories,
      data: valueForm
    })
    setIsModalOpenEditProductCategories(false)
  }
  const handleCancelButtonEditProductCategories = () => {
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
        { name: 'productNameCategories', label: 'Tên loại sản phẩm', type: 'text', width: 12, isRequired: true, maxLength: 300 },
      ],
    },
    data: productCategoriesData,
    table: {
      columns: ["Mã loại sản phẩm", "Tên loại sản phẩm", "Số lượng", "Thao tác"],
      width: ["20%", "40%", "20%", "20%"]
    }
  }


  const handleEnter = (id) => {
    const newParams = new URLSearchParams();
    newParams.set("id", id.id);
    setSearchParams(newParams);
  }
  const handleSearch = (query) => {
    const newParams = new URLSearchParams();
    newParams.set("query", query);
    setSearchParams(newParams);
  }
  const handleSearchSuggestion = (query) => {

    return useProduct.getSearchCategoriesSuggestion(query);
  }
  const dataSearch = {
    hasButtonCategory: false,
    hasButtonDisplay: false,
    currentQuery: query,
    placeholder: "Tìm kiếm theo tên loại sản phẩm",
    handleEnter: handleEnter,
    onSearch: handleSearch,
    handleSearchSuggestion: handleSearchSuggestion, //co 3 tham so la query, category = null, display = null,
  }


  const convertProductCategoriesListToTableData = (productCategoriesList) => {
    return productCategoriesList.map((item) => {
      return [
        { type: "text", content: `${item.id}` }, // STT
        {
          type: "text",
          content: `${item.name}`
        },
        {
          type: "text",
          content: `${item.item_count}`
        },
        {
          type: "array-components",
          components: [
            <button
              className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
              onClick={() => {
                setSelectedCategoryId(item.id);
                setContentSetting(prev => ({
                  ...prev,
                  category: item.name,
                  category_id: item.id,
                  title: `Quản lý sản phẩm thuộc loại: ${item.name}`,
                  description: `Chọn hoặc bỏ chọn các sản phẩm thuộc loại ${item.name}`
                }));
                setIsModalOpenSetting(true);

              }
              }
            >
              <SettingIcon />
            </button>,
            <button
              className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
              onClick={() => handleEditButton(item)}
            >
              <EditIcon />
            </button>,
            <button
              className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
              onClick={() => {
                setProductCategoriesToDelete(item);
                setOpenNotificaiton(true)
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
    setIdCurrentEditProductCategories(item.id);
    setIsModalOpenEditProductCategories(true);
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
        <Table columns={configProductCategories.table.columns} data={dataTable} isSetting={false} width={configProductCategories.table.width} />

      </div>


      <SimpleForm data={dataEditProductCategories} config={configProductCategories.form.configEdit} />
      <SimpleForm data={configProductCategories.form.dataAdd} config={configProductCategories.form.configAdd} />
      <Notification
        open={openNotificaiton}
        setOpen={setOpenNotificaiton}
        notification="Xác nhận xóa"
        subTitle={`Bạn có chắc muốn xoá loại sản phẩm "${productCategoriesToDelete?.name}" và XÓA TẨT CẢ SẢN PHẨM THUỘC LOẠI "${productCategoriesToDelete?.name}" không?`}
        buttonAction1 = {()=>{setOpenNotificaiton(false)}}
        buttonAction2={() => {
          if (productCategoriesToDelete) {
            deleteOneProductCategories(productCategoriesToDelete.id);
            setOpenNotificaiton(false);
          }
        }}
      />
      {isModalOpenSetting && <Setting
        isOpen={isModalOpenSetting}
        onClose={() => {
          setIsModalOpenSetting(false)
          searchSettingRef.current = {
            query: "",
            category: "Tất cả loại",
            display: "Tất cả trạng thái"
          }
        }}
        content={contentSetting}
        useData={useProduct.products}
        useDataSuggestion={useProduct}
        useDataCategories={useProduct.product_categories}
        searchSettingRef={searchSettingRef}
        onSave={async (changedItems) => {
            await updateCategory({ changedItems: changedItems });
        }} />}
    </>
  )
}


export default ProductCategories