import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import * as all from "../../redux/actions/actions";
import { fetchDepartments, baseUrl, handleUpload } from "../../redux/actions";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

function AddDepartment() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const { deptID } = useParams();

  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departmentsState);

  useEffect(() => {
    if (deptID && departments) {
      let department = departments?.find((el) => el.id == deptID);
      setName(department.name);
      setImage(department.img);
      document.querySelector(".upload-img").classList.add("active");
    }
  }, [departments, deptID]);

  function addNewDepartment() {
    if (!image || !name) {
      Swal.fire({
        title: "ادخل البيانات",
        icon: "error",
        timer: 3000,
      });
      return false;
    }

    setIsDisabled(true);

    if (deptID && typeof image === "string") {
      let data = {
        id: +deptID,
        name,
        img: image,
      };

      updateDepartments(data);
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      let data = {
        name: name,
        img: reader.result,
      };

      if (deptID) {
        updateDepartments({ ...data, id: +deptID });
        return;
      }

      axios
        .post(`${baseUrl}/api/Departments`, data)
        .then((res) => {
          Swal.fire({
            title: `تم اضافة القسم ${name}`,
            icon: "success",
            timer: 3000,
          });

          dispatch(fetchDepartments());
          clearInputs();
          navigate("/dashboard/department/index");
        })
        .catch((err) => {
          setIsDisabled(false);
          Swal.fire("حدث خطأ", "", "error");
        });
    };
  }

  function updateDepartments(data) {
    axios
      .put(`${baseUrl}/api/Departments?id=${deptID}`, data)
      .then((res) => {
        Swal.fire({
          title: `تم تعديل القسم ${name}`,
          icon: "success",
          timer: 3000,
        });
        dispatch(
          all.setDepartments(
            departments.map((el) => (el.id == deptID ? data : el))
          )
        );
        clearInputs();
        navigate("/dashboard/department/index");
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
            <h5>تعديل الأقسام</h5>
          </div>
          <h4
            className="p-2 text-white"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/department/index")}
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
                  <div
                    className="control-image-upload"
                    style={{ display: "none" }}
                  >
                    <div className="control-image-upload-container">
                      <div className="file-name">
                        <span> {image?.name || name} </span>
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
                              typeof image === "string" && deptID
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
                    data-val-required="The name field is required."
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
          </div>
          <div className="form-row row form-row-small">
            <div className="row m-0">
              <div className="col-md-12 text-end mb-3">
                <button
                  type="button"
                  className="btn btn-theme add-car"
                  onClick={addNewDepartment}
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

export default AddDepartment;
