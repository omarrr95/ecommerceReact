import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { baseUrl } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AddAdmin() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState("0");
  const [isDisabled, setIsDisabled] = useState(false);

  const [admins, setAdmins] = useState([]);
  const { adminID } = useParams();

  const navigate = useNavigate();

  function fetchAdmins() {
    axios.get(`${baseUrl}/api/Admins`).then((res) => {
      setAdmins(res.data);
    });
  }
  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (adminID && admins.length > 0) {
      let admin = admins?.find((el) => el.id == adminID);

      setName(admin.name);
      setUsername(admin.userName);
      setPassword(admin.password);
      setIsSuperAdmin(admin.superAdmin ? "1" : "0");
    }
  }, [admins, adminID]);

  function addNewAdmin() {
    if (!name || !userName || !password) {
      Swal.fire({
        title: "ادخل البيانات",
        icon: "error",
        timer: 3000,
      });
      return false;
    }
    setIsDisabled(true);

    let data = {
      name,
      userName,
      password,
      superAdmin: +isSuperAdmin ? true : false,
    };

    if (adminID) {
      updateAdmins({ ...data, id: +adminID });
      return;
    }

    axios
      .post(`${baseUrl}/api/Admins`, data)
      .then((res) => {
        Swal.fire({
          title: `تم اضافة المسئول ${data.name}`,
          icon: "success",
          timer: 3000,
        });
        clearInputs();
        navigate("/dashboard/admin/index");
      })
      .catch((err) => {
        setIsDisabled(false);
        Swal.fire("حدث خطأ", "", "error");
      });
  }

  function updateAdmins(data) {
    axios
      .put(`${baseUrl}/api/Admins?id=${adminID}`, data)
      .then((res) => {
        Swal.fire({
          title: `تم تعديل المسئول ${data.name}`,
          icon: "success",
          timer: 3000,
        });
        navigate("/dashboard/admin/index");
      })
      .catch((err) => {
        setIsDisabled(false);
        Swal.fire("حدث خطأ", "", "error");
      });
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
            onClick={() => navigate("/dashboard/admin/index")}
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
                  <input
                    className="did-floating-input w-100 large-input form-control  lang-en"
                    type="text"
                    data-val="true"
                    data-val-required="The Phone field is required."
                    id="password"
                    name="password"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="did-floating-label"> اسم المستخدم </label>
                  <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="password"
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
                    type="text"
                    data-val="true"
                    data-val-required="The Phone field is required."
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="did-floating-label"> كلمه السر </label>
                  <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="password"
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
                    id="isSuperAdmin"
                    name="isSuperAdmin"
                    value={isSuperAdmin}
                    onChange={(e) => setIsSuperAdmin(e.target.value)}
                  >
                    <option value="0">لا</option>
                    <option value="1">نعم</option>
                  </select>
                  <label className="did-floating-label">سوبر أدمن؟</label>
                  <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="discount"
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
                  onClick={addNewAdmin}
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

export default AddAdmin;
