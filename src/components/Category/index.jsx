import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Category() {
  const baseUrl = "http://ecommerce-api.omar-work.website";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios.get(`${baseUrl}/api/Categories`).then((res) => {
      console.log(res);
      setCategories(res.data);
    });
  }

  return (
    <div className="body-content">
      <div className="title-page">
        <div className="img-title">
          <h5> الأنواع </h5>
        </div>
      </div>
      <div className="box-section">
        <div className="col-md-12 text-end mb-3 px-3 pt-3">
          <Link className="btn btn-theme" to="/category/add">
            إضافة نوع جديد
          </Link>
        </div>
        <div className="input-group input-group-search p-3">
          <input
            type="text"
            className="form-control"
            id="LiveSearchBtn"
            placeholder="Search Here ..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text" id="basic-addon2">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        <div className="table-responsive">
          <table className="table table-style">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>القسم</th>
                <th>التحكم</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(({ id, name, img, departmentId }, index) => {
                return (
                  <tr key={id}>
                    <td className="promotion-id" scope="row">
                      {index + 1}
                    </td>
                    <td data-title="صورة الخدمة">
                      {" "}
                      <img width="60px" src={img} />
                    </td>
                    <td data-title="إسم الخدمة En">{name}</td>
                    <td data-title="إسم الخدمة Ar">{departmentId}</td>

                    <td className="control-btn">
                      <div className="d-flex">
                        <a
                          className="btn btn-details edit"
                          href="/Categories/FormEdit/1"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </a>
                        <div className="btn-group dropup">
                          <button
                            type="button"
                            className="btn btn-details delete"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <div className="popover-content text-center">
                              <div className="btn-User">
                                <a className="btn btn-icon-split btn-success">
                                  <span className="icon text-white-50">
                                    <i className="fa fa-check-square"></i>
                                  </span>
                                  <span className="text"> Yes</span>
                                </a>
                                <a
                                  className="btn btn-danger btn-icon-split"
                                  data-dismiss="confirmation"
                                >
                                  <span className="icon text-white-50">
                                    <i className="fa fa-trash-alt"></i>
                                  </span>
                                  <span className="text"> No</span>
                                </a>
                              </div>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Category;
