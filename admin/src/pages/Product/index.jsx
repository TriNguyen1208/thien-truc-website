import React from 'react'
import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect, useMemo, useRef } from "react"
import DynamicForm from '../../components/DynamicForm'
import SearchBar from '../../components/Search'
import { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Table from "../../components/Table"
import { DeleteIcon, EditIcon, UploadIcon } from "../../components/Icon"
import Notification from '@/components/Notification'
import ProductImageCell from '../../components/ProductImageCell'
import changeToFormData from '../../utils/changeToFormData'
import Loading from '@/components/Loading'
const Product = () => {
  //Handle scroll to new product
  const location = useLocation();
  const {createId} = location.state || {};
  const refs = useRef({});
  const navigate = useNavigate();
  //
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
    { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true, maxLength: 500 },
    { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: false, options: categoriesObject },
    { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500000)", isOnlyNumber: true },
    { name: 'warranty', label: 'Thời gian bảo hành (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)', isOnlyNumber: true },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false },
    { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12 },
    { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm (tick tối đa 3 đặc điểm nổi bật)', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true, limitCheckbox: 3 },
    { name: 'local_image', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false },
    { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12 }
  ]);



  const [openNotification, setOpenNotification] = useState(false);

  const handleCancelButtonAddProduct = () => {
    setIsModalOpenAddProduct(false)
  }

  const handleCancelButtonEditProduct = () => {
    setIsModalOpenEditProduct(false)
  }
  const categoriesDefault = "Tẩt cả sản phẩm";
  const [searchParams, setSearchParams] = useSearchParams();
  // Lay params
  var id = searchParams.get('id') || undefined;
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
  // const { mutate: updateOneProduct, isPending: isPendingUpdateOneProduct } = useProducts.products.updateOne();
  const { data: productData, isLoading: isLoadingProductData } = useProducts.products.getListByCategory(id, query, filter === categoriesDefault ? undefined : filter, bool_featured);
  const { data: productCategoriesData, isLoading: isLoadingProductCategoriesData } = useProducts.product_categories.getAll();
  const { mutate: updateFeatureProduct, isPending: isPendingUpdateFeatureOne } = useProducts.products.updateFeatureOne();
  const { mutate: deleteOneProduct, isPending: isPendingDeleteOneProduct } = useProducts.products.deleteOne();
  const { mutate: createOneProduct, isPending: isPendingCreateOneProduct } = useProducts.products.createOne();
  const { mutate: updateOneProduct, isPending: isPendingUpdateOneProduct } = useProducts.products.updateOne();
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
      { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true, maxLength: 500 },
      { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: false, options: object },
      { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500000)", isOnlyNumber: true },
      { name: 'warranty', label: 'Thời gian bảo hàng (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)', isOnlyNumber: true },
      { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false },
      { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12 },
      { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm  (tick tối đa 3 đặc điểm nổi bật)', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true, limitCheckbox: 3 },
      { name: 'img', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false },
      { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12 }
    ])
  }, [categories]);
  if (isLoadingProductData || isLoadingProductCategoriesData  || isPendingCreateOneProduct) {
    return (
      <>
       {/* <div className="loading-overlay">Đang tải...</div> */}
      {/* <Loading /> */}
      {/* <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50"> */}
           <Loading />
      {/* </div> */}

      </>
      
    )
  }


  const idCurrentCategories = filter ? (categories || []).findIndex(item => item === filter) : 0;
  const idCurrentDisplays = is_featured ? (displays).findIndex(item => item === is_featured) : 0;
  const handleSubmitButtonAddProduct = (valueForm) => {
    const { img, ...rest } = valueForm;
    let newForm = null;
    if (valueForm.img instanceof File) {
      newForm = {
        ...rest,
        local_image: img,
      }
    } else {
      newForm = {
        ...rest,
        external_avatar_img: img,
      }
    }
    const formData = changeToFormData(newForm);

    createOneProduct(formData);
    setIsModalOpenAddProduct(false);
  }
  const handleSubmitButtonEditProduct = (valueForm) => {
    const { img, ...rest } = valueForm;
    let newForm = null;
    if (valueForm.img instanceof File) {
      newForm = {
        ...rest,
        local_image: img,
      }
    } else {
      newForm = {
        ...rest,
        external_avatar_img: img,
      }
    }
    const formData = changeToFormData(newForm);

  // cập nhật data...

  // phục hồi vị trí cuộn
  updateOneProduct({
    id: idCurrentEditProduct,
    data: formData
  });
 
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
        handleCancelModal: handleCancelButtonAddProduct,
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
        handleCancelModal: handleCancelButtonEditProduct,
        setIsModalOpen: setIsModalOpenEditProduct,
      },
      dataAddProduct: [
        { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true, maxLength: 500 },
        { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: true, options: categoriesObject },
        { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500000)", isOnlyNumber: true },
        { name: 'warranty', label: 'Thời gian bảo hàng (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)', isOnlyNumber: true },
        { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false },
        { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12 },
        { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm  (tick tối đa 3 đặc điểm nổi bật)', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true, limitCheckbox: 3 },
        { name: 'img', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false },
        { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12 }
      ],
    },

    dataProduct: productData,
    table: {
      columns: ["Mã SP", "Hình ảnh", "Tên sản phẩm", "Giá", "Bảo hành", "Trưng bày", "Thao tác"],
      width: ["8%", "10%", "28%", "15%", "13%", "13%", "15%"]
    },


  }

  const handleEditButton = (item) => {
    var valueCharacteristic = (item.product_features || []).map(item => (
      {
        value: item,
        isCheckbox: false,
      }
    ));
    (item.highlight_feature_ids || []).forEach(item => {
      valueCharacteristic[item].isCheckbox = true;
    })

    const updatedForm = [
      { ...dataEditProduct[0], value: item.name },
      { ...dataEditProduct[1], value: item.category.name },
      { ...dataEditProduct[2], value: item.price },
      { ...dataEditProduct[3], value: item.warranty_period },
      { ...dataEditProduct[4], value: item.description },
      { ...dataEditProduct[5], value: item.product_specifications },
      { ...dataEditProduct[6], value: valueCharacteristic },
      { ...dataEditProduct[7], value: item.product_img },
      { ...dataEditProduct[8], value: item.is_featured },

    ];
    setDataEditProduct(updatedForm);
    setIdCurrentEditProduct(item.id);
    setIsModalOpenEditProduct(true);
  }

  const convertProductListToTableData = (productList) => {
    return productList.map((product) => {
      return [
        { type: "text", content: 
            <div ref={(el) => {
              refs.current[product.id] = el
              if (product.id === createId && el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                navigate(location.pathname, { replace: true, state: {} });
              }
            }}>
              {product.id}
            </div> 
        },
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
        { type: "text", content: `${product.price !== "" ? Number(product.price).toLocaleString('vi-VN') + ' đ' : 'Cập nhật sau'} ` },
        { type: "text", content: `${product.warranty_period !== "" ? product.warranty_period + ' tháng' : "Cập nhật sau"}` },
        {
          type: "component",
          component: (
            <div className="ml-[30px]">
              <input
                type="checkbox"
                checked={product.is_featured}
                onChange={() => {
                  updateFeatureProduct({
                    id: product.id,
                    status: !product.is_featured,
                  });
                }}
                disabled={isPendingUpdateFeatureOne}
                className={`
                    w-5 h-5 appearance-none cursor-pointer rounded-[3px]
                    transition-all duration-200
                    border border-gray-400
                    checked:bg-green-500
                    hover:shadow hover:scale-105
                    absolute top-6 left-10
                  `}
              />
              {product.is_featured && (
                <svg
                  className="absolute top-[24px] left-[40px] w-5 h-5 text-white pointer-events-none"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 8L7 11L12 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
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
                setOpenNotification(true)
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
    newParams.set("id", id.id);
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
    return useProducts.getSearchSuggestions(query, category, display);
  }
  const dataSearch = {
    hasButtonCategory: true,
    hasButtonDisplay: true,
    categories: categories || [],
    displays: displays,
    currentCategory: categories[idCurrentCategories],
    currentDisplay: displays[idCurrentDisplays],
    currentQuery: query,
    placeholder: "Tìm kiếm theo tên sản phẩm",
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
                width={configProduct.table.width}
              />
            </div>
          );
        })
      }
      {
        (isPendingUpdateOneProduct || isPendingDeleteOneProduct) &&  (
          <Loading />
        )
      }

      <DynamicForm data={dataEditProduct} config={configProduct.form.configEditProduct} />
      <DynamicForm data={configProduct.form.dataAddProduct} config={configProduct.form.configAddProduct} />
      <Notification
        open={openNotification}
        setOpen={setOpenNotification}
        notification="Xác nhận xóa"
        subTitle={`Bạn có chắc muốn xoá sản phẩm "${productToDelete?.name}" không?`}
        buttonAction1={() => { setOpenNotification(false); }}
        buttonAction2={() => {
          if (productToDelete) {
            deleteOneProduct(productToDelete.id);
            setOpenNotification(false);
          }
        }}

      />

    </>
  )
}

export default Product
