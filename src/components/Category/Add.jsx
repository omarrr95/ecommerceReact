import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/actions/actions.js";
import {
  baseUrl,
  fetchCategories,
  handleUpload,
} from "../../redux/actions/index.js";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";

function AddCategory() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [departmentId, setDepartmentId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const { catID } = useParams();

  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departmentsState);
  const { categories } = useSelector((state) => state.categoriesState);
  const { brands } = useSelector((state) => state.brandsState);

  useEffect(() => {
    if (catID && categories) {
      // axios.get(`${baseUrl}/api/Categories/${catID}`).then((res) => {
      //   setName(res.data.name);
      //   setImage(res.data.img);
      //   setDepartmentId(res.data.departmentId);
      //   document.querySelector(".upload-img").classList.add("active");
      // });

      let category = categories?.find((el) => el.id == catID);
      setName(category.name);
      setImage(category.img);
      setBrandId(category.brandsId);
      setDepartmentId(category.departmentId);
      document.querySelector(".upload-img").classList.add("active");
    }
  }, [categories, catID]);

  function addNewCategory() {
    if (!image || !name) {
      Swal.fire({
        title: "ادخل البيانات",
        icon: "error",
        timer: 3000,
      });
      return false;
    }
    setIsDisabled(true);

    if (catID && typeof image === "string") {
      let data = {
        id: +catID,
        name,
        departmentId,
        brandsId: brandId,
        img: image,
      };

      updateCategories(data);
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      let data = {
        name,
        departmentId,
        brandsId: brandId,
        img: reader.result,
      };

      if (catID) {
        updateCategories({ ...data, id: +catID });
        return;
      }

      axios
        .post(`${baseUrl}/api/Categories`, data)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: `تم اضافة النوع ${name}`,
            icon: "success",
            timer: 3000,
          });
          dispatch(fetchCategories());
          clearInputs();
          navigate("/dashboard/category/index");
        })
        .catch((err) => {
          setIsDisabled(false);
          Swal.fire("حدث خطأ", "", "error");
        });
    };
  }

  function updateCategories(data) {
    axios
      .put(`${baseUrl}/api/Categories?id=${catID}`, data)
      .then((res) => {
        Swal.fire({
          title: `تم تعديل النوع ${name}`,
          icon: "success",
          timer: 3000,
        });
        dispatch(
          setCategories(categories.map((el) => (el.id == catID ? data : el)))
        );
        clearInputs();
        navigate("/dashboard/category/index");
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

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="body-content">
        <div className="title-page">
          <div className="img-title">
            <h5>تعديل الأنواع</h5>
          </div>
          <h4
            className="p-2 text-white"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/category/index")}
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
                        <span>{image?.name || name}</span>
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
                              typeof image === "string" && catID
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
                    type="text"
                    data-val="true"
                    data-val-required="The Phone field is required."
                    id="name"
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
                    id="collection"
                    name="collection"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  >
                    <option value="">إختر نوع</option>
                    {departments?.map(({ id, name }) => {
                      return (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                  <label className="did-floating-label">القسم </label>
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
                  <select
                    className="did-floating-input w-100 large-input form-control"
                    id="collection"
                    name="collection"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                  >
                    <option value="">إختر ماركة</option>
                    {brands?.map(({ id, name }) => {
                      return (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                  <label className="did-floating-label">الماركة </label>
                  <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="Location_ar"
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
                  disabled={isDisabled}
                  onClick={addNewCategory}
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
    </>
  );
}

export default AddCategory;
