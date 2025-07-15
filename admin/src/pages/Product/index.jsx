import React from 'react'
import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect, useMemo } from "react"
import DynamicForm from '../../components/DynamicForm'
import SearchBar from '../../components/Search'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import useProducts from '../../hooks/useProducts';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ColorBlock from '../../components/ColorBlock';
import Table from "../../components/Table"
import { DeleteIcon, EditIcon, UploadIcon } from "../../components/Icon"
import { CancelPopup } from '../../components/Popup'
import ProductImageCell from '../../components/ProductImageCell'

const Product = () => {
  const { setLayoutProps } = useLayout()
  useEffect(() => {
    setLayoutProps({
      title: "Quản lý sản phẩm",
      description: "Quản lý danh sách sản phẩm",
      hasButton: true,
      buttonLabel: "Thêm sản phẩm",
      buttonAction: () => {
        setIsModalOpenAddProduct(true);
      }
    })
  }, []);

  // ================ PRODUCT =============================== 

  const [productToDelete, setProductToDelete] = useState(null);
  const displays = ["Tất cả trạng thái", "Trưng bày", "Không trưng bày"];
  const [categoriesObject, setCategoriesObject] = useState([]);
  const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
  const [isModalOpenEditProduct, setIsModalOpenEditProduct] = useState(false);
  const [idCurrentEditProduct, setIdCurrentEditProduct] = useState(null);
  const [dataEditProduct, setDataEditProduct] = useState([
    { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true },
    { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: false, options: categoriesObject },
    { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500000)", isOnlyNumber: true },
    { name: 'warranty', label: 'Thời gian bảo hàng (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)', isOnlyNumber: true },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false },
    { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12 },
    { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true },
    { name: 'avatarImage', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false },
    { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12 }
  ]);
  const [openCancel, setOpenCancel] = useState(false);

  const handleCancelButtonAddProduct = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddProduct(false)
  }

  const handleCancelButtonEditProduct = () => {
    console.log('Day la button cancle')
    setIsModalOpenEditProduct(false)
  }
  const categoriesDefault = "Tẩt cả sản phẩm";
  const [searchParams, setSearchParams] = useSearchParams();
  // Lay params
  const filter = searchParams.get('filter') || undefined;
  var query = searchParams.get('query') || undefined;
  const is_featured = searchParams.get('is_featured') || undefined;
  var bool_featured = undefined;
  if (is_featured) {
    if (is_featured === displays[1]) {
      bool_featured = true;
    }
    else if (is_featured === displays[2]) {
      bool_featured = false;
    }
    else {
      bool_featured = undefined
    }
  }
  const { mutate: updateOneProduct, isLoading: isLoadingUpdateOneProduct } = useProducts.products.updateOne();
  const { data: productData, isLoading: isLoadingProductData } = useProducts.products.getListByCategory(query, filter === categoriesDefault ? undefined : filter, bool_featured);
  const { data: productCategoriesData, isLoading: isLoadingProductCategoriesData } = useProducts.product_categories.getList();
  const { mutate: updateFeatureProduct, isLoading: isLoadingUpdateFeatureOne } = useProducts.products.updateFeatureOne();
  const { mutate: deleteOneProduct, isLoading: isLoadingDeleteOneProduct } = useProducts.products.deleteOne();
  const { mutate: createOneProduct, isLoading: isLoadingCreateOneProduct } = useProducts.products.createOne();
  const categories = useMemo(() => {
    if (!productCategoriesData) return [categoriesDefault];
    return [categoriesDefault, ...productCategoriesData.map(item => item.name)];
  }, [productCategoriesData]);

  useEffect(() => {
    const object = [
      ...categories.map(item => ({
        label: item,
        value: item
      }))];
    object[0].value = "";

    setCategoriesObject(object);
    setDataEditProduct([
      { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true },
      { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: false, options: object },
      { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500000)", isOnlyNumber: true },
      { name: 'warranty', label: 'Thời gian bảo hàng (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)', isOnlyNumber: true },
      { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false },
      { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12 },
      { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true },
      { name: 'avatarImage', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false },
      { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12 }
    ])
  }, [categories]);
  if (isLoadingProductData || isLoadingProductCategoriesData || isLoadingUpdateFeatureOne || isLoadingDeleteOneProduct || isLoadingCreateOneProduct || isLoadingUpdateOneProduct) {
    return (
      <>
        Dang loading...
      </>
    )
  }

  const idCurrentCategories = filter ? (categories || []).findIndex(item => item === filter) : 0;
  const handleSubmitButtonAddProduct = (valueForm) => {
    console.log(valueForm);
    createOneProduct(valueForm);
    setIsModalOpenAddProduct(false)
  }
  const handleSubmitButtonEditProduct = (valueForm) => {
    console.log('Day la button edit submit', valueForm)
    console.log(idCurrentEditProduct)
    updateOneProduct({
                id: idCurrentEditProduct,
                data: valueForm
    });
    console.log(idCurrentEditProduct, valueForm);
    setIsModalOpenEditProduct(false)
  }


  const configProduct = {
    form: {
      configAddProduct: {
        title: "Thêm sản phẩm mới",
        description: "Điền thông tin để thêm sản phẩm mới",
        contentCancelButton: "Hủy",
        contentSubmitButton: "Thêm mới",
        widthModal: 800,
        isModalOpen: isModalOpenAddProduct,
        handleSubmitButton: handleSubmitButtonAddProduct,
        handleCancelButton: handleCancelButtonAddProduct,
        setIsModalOpen: setIsModalOpenAddProduct,
      },
      configEditProduct: {
        title: "Cập nhật sản phẩm",
        description: "Điền thông tin để cập nhật sản phẩm ",
        contentCancelButton: "Hủy",
        contentSubmitButton: "Cập nhật",
        widthModal: 800,
        isModalOpen: isModalOpenEditProduct,
        handleSubmitButton: handleSubmitButtonEditProduct,
        handleCancelButton: handleCancelButtonEditProduct,
        setIsModalOpen: setIsModalOpenEditProduct,
      },
      dataAddProduct: [
        { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true },
        { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: true, options: categoriesObject },
        { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500000)", isOnlyNumber: true },
        { name: 'warranty', label: 'Thời gian bảo hàng (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)', isOnlyNumber: true },
        { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false },
        { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12 },
        { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true },
        { name: 'avatarImage', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false },
        { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12 }
      ],
    },

    dataProduct: productData,
    table: {
      columns: ["Mã SP", "Hình ảnh", "Tên sản phẩm", "Giá", "Bảo hành", "Trưng bày", "Thao tác"],
    },


  }

  const handleEditButton = (item) => {

    const updatedForm = [
      { ...dataEditProduct[0], value: item.name },
      { ...dataEditProduct[1], value: item.category.name },
      { ...dataEditProduct[2], value: item.price },
      { ...dataEditProduct[3], value: item.warranty_period },
      { ...dataEditProduct[4], value: item.description },
      { ...dataEditProduct[5], value: item.product_specifications },
      { ...dataEditProduct[6], value: item.product_features },
      { ...dataEditProduct[7], value: item.product_img },
      { ...dataEditProduct[8], value: item.is_featured },

    ];
    setDataEditProduct(updatedForm);
    console.log(item.id, item, updatedForm);
    setIdCurrentEditProduct(item.id);
    setIsModalOpenEditProduct(true);
    console.log(dataEditProduct);
  }

  const convertProductListToTableData = (productList) => {
    return productList.map((product) => {
      return [
        { type: "text", content: `${product.id}` }, // STT
        {
          type: "component",
          component: (
            <ProductImageCell
              imageUrl={product.product_img || ""}
              productName={product.name}
            />
          ),
        },
        { type: "text", content: product.name },
        { type: "text", content: `${product.price != null ? Number(product.price).toLocaleString() : ''} ₫` },
        { type: "text", content: `${product.warranty_period} tháng` },
        {
          type: "component",
          component: (
            <div className="ml-[30px]">
              <input
                type="checkbox"
                className="w-5 h-5 accent-black "
                checked={product.is_featured}
                onChange={() => {
                  updateFeatureProduct({
                                id: product.id, 
                                status: !product.is_featured});
                }}
                disabled={isLoadingUpdateFeatureOne}
              />
              {/* {isPending ? "Đang cập nhật..." : "Đổi trạng thái"} */}
            </div>
          ),
        },
        {
          type: "array-components",
          components: [
            <button
              className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
              onClick={() => handleEditButton(product)}
            >
              <EditIcon />
            </button>,
            <button
              className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
              onClick={() => {
                setProductToDelete(product);
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


  const handleEnter = (id) => {
    // TODO: fix 
    const newParams = new URLSearchParams();
    newParams.set("query", id.query);
    setSearchParams(newParams);
  }
  const handleSearch = (query, filter, is_featured) => {
    const newParams = new URLSearchParams();
    newParams.set("query", query);
    newParams.set("filter", filter);
    newParams.set("is_featured", is_featured);
    setSearchParams(newParams);
  }

  const handleSearchSuggestion = (query, category, display) => {
    console.log(query, category, display);
    return useProducts.getSearchSuggestions(query, category, display);
  }
  const dataSearch = {
    hasButtonCategory: true,
    hasButtonDisplay: true,
    categories: categories || [],
    displays: displays,
    currentCategory: categories[idCurrentCategories],
    currentDisplay: displays[0],
    currentQuery: query,
    placeholder: "Tìm kiếm theo tên sản phẩm hoặc mã sản phẩm",
    handleEnter: handleEnter,
    onSearch: handleSearch,

    handleSearchSuggestion: handleSearchSuggestion, //co 3 tham so la query, category = null, display = null,
  }

  return (
    <>
      <div className="bg-white px-6 py-6 rounded-lg shadow-sm border border-gray-200  mb-[25px]">
        <SearchBar data={dataSearch} />
      </div>
      {
        Object.entries(configProduct.dataProduct).map(([categoryName, productList]) => {
          const dataTable = convertProductListToTableData(productList);

          return (
            <div
              key={categoryName}
              className="bg-white px-6 py-6 rounded-lg shadow-sm border border-gray-200 mb-[25px]"
            >
              <div className="text-[30px] font-[600] mb-[5px]">{categoryName}</div>
              <div className="text-gray-600 mb-[30px]">
                {productList.length} sản phẩm
              </div>
              <Table
                columns={configProduct.table.columns}
                data={dataTable}
                isSetting={false}
              />
            </div>
          );
        })
      }


      <DynamicForm data={dataEditProduct} config={configProduct.form.configEditProduct} />
      <DynamicForm data={configProduct.form.dataAddProduct} config={configProduct.form.configAddProduct} />
      <CancelPopup
        open={openCancel}
        setOpen={setOpenCancel}
        notification="Xác nhận xóa"
        subTitle={`Bạn có chắc muốn xoá sản phẩm "${productToDelete?.name}" không?`}
        buttonAction2={() => {
          if (productToDelete) {
            deleteOneProduct(productToDelete.id);
            setOpenCancel(false);
          }
        }}
      />
    </>
  )
}

export default Product
