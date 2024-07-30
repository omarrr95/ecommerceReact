import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/actions";
import { fetchProducts, baseUrl, handleUpload } from "../../redux/actions";

function AddProduct() {
  let { productID } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [hasDiscount, setHasDiscount] = useState("0");
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryID, setCategoryID] = useState("");

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsState);
  const { categories } = useSelector((state) => state.categoriesState);

  const navigate = useNavigate();

  useEffect(() => {
    if (productID && products) {
      let product = products?.find((el) => el.id == productID);
      setName(product.name);
      setImage(product.img);
      setCategoryID(product.categoriesId);
      setDescription(product.description);
      setDiscount(product.priceBeforeDiscount - product.price);
      setPriceBeforeDiscount(product.priceBeforeDiscount);
      setHasDiscount(+product.hasDiscount);
      document.querySelector(".upload-img").classList.add("active");
    }
  }, [products, productID]);

  function addNewProduct() {
    if (
      !image ||
      !name ||
      !description ||
      !priceBeforeDiscount ||
      !categoryID
    ) {
      Swal.fire({
        title: "ادخل البيانات",
        icon: "error",
        timer: 3000,
      });
      return false;
    }
    if (priceBeforeDiscount <= discount) {
      Swal.fire("الخصم أكبر من السعر", "", "error");
      return;
    }

    setIsDisabled(true);

    if (productID && typeof image === "string") {
      let data = {
        id: +productID,
        name,
        description,
        img: image,
        price: priceBeforeDiscount - +discount,
        hasDiscount: hasDiscount == "0" ? false : true,
        priceBeforeDiscount,
        categoriesId: categoryID,
      };

      updateProduct(data);
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      let data = {
        name,
        description,
        img: reader.result,
        price: priceBeforeDiscount - discount,
        hasDiscount: hasDiscount == "0" ? false : true,
        priceBeforeDiscount,
        categoriesId: categoryID,
      };

      if (productID) {
        updateProduct({ ...data, id: +productID });
        return;
      }

      axios
        .post(`${baseUrl}/api/Product`, data)
        .then((res) => {
          Swal.fire({
            title: `تم اضافة المنتج ${name}`,
            icon: "success",
            timer: 3000,
          });

          dispatch(fetchProducts());
          clearInputs();
          navigate("/product/index");
        })
        .catch((err) => {
          console.log("cause", err.message);
          setIsDisabled(false);
          Swal.fire("حدث خطأ", "", "error");
        });
    };
  }

  function updateProduct(data) {
    axios
      .put(`${baseUrl}/api/Product?id=${productID}`, data)
      .then((res) => {
        Swal.fire({
          title: `تم تعديل القسم ${name}`,
          icon: "success",
          timer: 3000,
        });
        dispatch(
          setProducts(products.map((el) => (el.id == productID ? data : el)))
        );
        clearInputs();
        navigate("/product/index");
      })
      .catch((err) => {
        setIsDisabled(false);
        Swal.fire("حدث خطأ", "", "error");
      });
  }

  function clearInputs() {
    setName("");
    setImage(null);
    document.getElementById("file-upload").value = "";
    document.querySelector(".upload-img").classList.remove("active");
  }

  function handleHasDiscount(e) {
    if (e.target.value == "0") {
      setDiscount("");
      setHasDiscount("0");
    } else setHasDiscount("1");
  }

  return (
    <div className="body-content">
      <div className="title-page">
        <div className="img-title">
          <h5>تعديل المنتجات</h5>
        </div>
        <h4
          className="p-2 text-white"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/product/index")}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </h4>
      </div>
      <div className="box-section">
        <div className="form-row row form-row-small pb-0">
          <div className="col-md-12">
            <div className="view-details mb-3">
              <section>
                <div className="section-head">
                  <span></span>
                  البيانات الرئيسية
                </div>
              </section>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 ">
            <div className="new-box upload-status">
              <div className="title-new-upload">
                <h5>صورة اللوجو</h5>
              </div>
              <div className="file-lable-container upload-img ">
                <label className="file-label">
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  اسحب الصورة أو <span> اضغط للتحميل</span>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  name="file-upload"
                  className="fileInput"
                  accept=".png,.jpeg,.jpg"
                  data-name={image?.name || ""}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    handleUpload(e.target.files[0]);
                  }}
                />
                <input type="hidden" className="input-form-image" />
                <div className="progress-container">
                  <div className="progress-bar"></div>
                  <div className="progress-text"></div>
                </div>
                <div className="control-image-upload">
                  <div className="control-image-upload-container">
                    <div className="file-name">
                      <span> Logo</span>
                    </div>
                    <div className="actions">
                      <i
                        className="fa-regular fa-eye"
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      ></i>
                      <i
                        className="fa-regular fa-trash-can"
                        onClick={() => {
                          setImage(null);
                          document.getElementById("file-upload").value = "";
                          document
                            .querySelector(".upload-img")
                            .classList.remove("active");
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div className="preview-container-modal">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="btn btn-close m-2"
                    ></button>
                    <i className="fas fa-times"></i>
                    <div className="preview-container">
                      <div className="preview-container-img">
                        <img
                          src={
                            typeof image === "string" && productID
                              ? image
                              : URL.createObjectURL(image)
                          }
                          alt="view image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 ">
            <div className="container-form-input input-label">
              <div className="did-floating-label-content">
                <input
                  className="did-floating-input w-100 large-input form-control  lang-en"
                  required=""
                  type="text"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="Name"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="did-floating-label"> الاسم </label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="Phone"
                  data-valmsg-replace="true"
                ></span>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 ">
            <div className="container-form-input input-label">
              <div className="did-floating-label-content">
                <select
                  className="did-floating-input w-100 large-input form-control"
                  required
                  id="collection"
                  name="collection"
                  value={categoryID}
                  onChange={(e) => setCategoryID(+e.target.value)}
                >
                  <option value="">اختر نوع</option>
                  {categories?.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </select>
                <label className="did-floating-label">النوع </label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="Location_ar"
                  data-valmsg-replace="true"
                ></span>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 ">
            <div className="container-form-input input-label">
              <div className="did-floating-label-content">
                <textarea
                  className="did-floating-input w-100 large-input form-control  lang-en"
                  required=""
                  type="text"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label className="did-floating-label">الوصف</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="description"
                  data-valmsg-replace="true"
                ></span>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 ">
            <div className="container-form-input input-label">
              <div className="did-floating-label-content">
                <input
                  className="did-floating-input w-100 large-input form-control  lang-en"
                  type="number"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="price"
                  name="price"
                  value={priceBeforeDiscount}
                  onChange={(e) => setPriceBeforeDiscount(+e.target.value)}
                />
                <label className="did-floating-label">السعر</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="price"
                  data-valmsg-replace="true"
                ></span>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 ">
            <div className="container-form-input input-label">
              <div className="did-floating-label-content">
                <select
                  className="did-floating-input w-100 large-input form-control  lang-en"
                  id="hasDiscount"
                  name="hasDiscount"
                  value={hasDiscount}
                  onChange={(e) => handleHasDiscount(e)}
                >
                  <option value="0">لا</option>
                  <option value="1">نعم</option>
                </select>
                <label className="did-floating-label">له خصم ؟</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="discount"
                  data-valmsg-replace="true"
                ></span>
              </div>
            </div>
          </div>

          {+hasDiscount === 1 && (
            <div className="col-md-3 col-sm-6 ">
              <div className="container-form-input input-label">
                <div className="did-floating-label-content">
                  <input
                    className="did-floating-input w-100 large-input form-control  lang-en"
                    required=""
                    type="number"
                    data-val="true"
                    data-val-required="The Phone field is required."
                    id="discount"
                    name="discount"
                    value={discount}
                    onChange={(e) => setDiscount(+e.target.value)}
                  />
                  <label className="did-floating-label">قيمة الخصم</label>
                  <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="discount"
                    data-valmsg-replace="true"
                  ></span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="form-row row form-row-small">
          <div className="row m-0">
            <div className="col-md-12 text-end mb-3">
              <button
                type="button"
                className="btn btn-theme add-car"
                onClick={addNewProduct}
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <span className="spinner-border"></span>
                ) : (
                  "حفظ التعديلات"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
