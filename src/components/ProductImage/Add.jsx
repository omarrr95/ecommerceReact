import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import * as all from "../../redux/actions/actions";
import { fetchProductImages, baseUrl, handleUpload } from "../../redux/actions";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function AddProductImage() {
  const [image, setImage] = useState(null);
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const { imageID } = useParams();

  const dispatch = useDispatch();
  const { productImages } = useSelector((state) => state.productImagesState);
  const { products } = useSelector((state) => state.productsState);

  useEffect(() => {
    if (imageID && productImages) {
      let productImage = productImages?.find((el) => el.id == imageID);
      setProductId(productImage.productId);
      setImage(productImage.images);
      document.querySelector(".upload-img").classList.add("active");
    }
  }, [productImages, imageID]);

  function addNewProductImage() {
    if (!image || !productId) {
      Swal.fire({
        title: "ادخل البيانات",
        icon: "error",
        timer: 3000,
      });
      return false;
    }

    setIsDisabled(true);

    if (imageID && typeof image === "string") {
      let data = {
        id: +imageID,
        productId,
        images: image,
      };

      updateProductImages(data);
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      let data = {
        productId: +productId,
        images: reader.result,
      };

      if (imageID) {
        updateProductImages({ ...data, id: +imageID });
        return;
      }

      console.log("Data", data);

      axios
        .post(`${baseUrl}/api/ProductImage`, data)
        .then((res) => {
          Swal.fire({
            title: `تم اضافة القسم ${productId}`,
            icon: "success",
            timer: 3000,
          });

          dispatch(fetchProductImages());
          clearInputs();
          navigate("/dashboard/productImage/index");
        })
        .catch((err) => {
          setIsDisabled(false);
          Swal.fire("حدث خطأ", "", "error");
        });
    };
  }

  function updateProductImages(data) {
    axios
      .put(`${baseUrl}/api/ProductImage?id=${imageID}`, data)
      .then((res) => {
        Swal.fire({
          title: `تم تعديل القسم ${productId}`,
          icon: "success",
          timer: 3000,
        });
        dispatch(
          all.setProductImages(
            productImages.map((el) => (el.id == imageID ? data : el))
          )
        );
        clearInputs();
        navigate("/dashboard/productImage/index");
      })
      .catch((err) => {
        setIsDisabled(false);
        Swal.fire("حدث خطأ", "", "error");
      });
  }

  function clearInputs() {
    setProductId("");
    setImage(null);
    document.getElementById("file-upload").value = "";
    document.querySelector(".upload-img").classList.remove("active");
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="body-content">
        <div className="title-page">
          <div className="img-title">
            <h5>تعديل صور المنتج</h5>
          </div>
          <h4
            className="p-2 text-white"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/productImage/index")}
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
                <div className="file-lable-container upload-img">
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
                    data-name={image?.productId || ""}
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
                  <div
                    className="control-image-upload"
                    style={{ display: "none" }}
                  >
                    <div className="control-image-upload-container">
                      <div className="file-productId">
                        <span> {image?.name || " منتج " + productId} </span>
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
                              typeof image === "string" && imageID
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
                  <select
                    className="did-floating-input w-100 large-input form-control  lang-en"
                    id="productId"
                    name="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  >
                    <option value="">اختر منتج</option>
                    {products?.map((el) => (
                      <option value={el.id} key={el.id}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                  <label className="did-floating-label"> المنتج </label>
                  <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="Phone"
                    data-valmsg-replace="true"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-row row form-row-small">
            <div className="row m-0">
              <div className="col-md-12 text-end mb-3">
                <button
                  type="button"
                  className="btn btn-theme add-car"
                  onClick={addNewProductImage}
                  disabled={isDisabled}
                >
                  {isDisabled ? (
                    <span className="spinner-border"></span>
                  ) : (
                    " حفظ التعديلات"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProductImage;
