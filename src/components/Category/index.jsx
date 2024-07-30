import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/actions/actions";
import { baseUrl } from "../../redux/actions";

function Category() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoriesState);
  const { departments } = useSelector((state) => state.departmentsState);
  const { brands } = useSelector((state) => state.brandsState);

  function deleteCategory(category) {
    axios.delete(`${baseUrl}/api/Categories?id=${category.id}`).then((res) => {
      dispatch(setCategories(categories.filter((el) => el.id != category.id)));
      Swal.fire({
        title: `تم حذف القسم ${category.name}`,
        icon: "success",
        timer: 3000,
      });
    });
  }

  function search(e) {
    let rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      if (row.textContent.includes(e.target.value)) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
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
            onChange={search}
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
                <th>البراند</th>
                <th>التحكم</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map(
                ({ id, name, img, departmentId, brandsId }, index) => {
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
                      <td data-title="إسم الخدمة Ar">
                        {
                          departments?.find((el) => +el.id === +departmentId)
                            ?.name
                        }
                      </td>
                      <td>
                        {brands?.find((el) => +el.id === +brandsId)?.name}
                      </td>

                      <td className="control-btn">
                        <div className="d-flex">
                          <Link
                            className="btn btn-details edit"
                            to={`/category/edit/${id}`}
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </Link>
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
                                  <a
                                    className="btn btn-icon-split btn-success"
                                    onClick={() =>
                                      deleteCategory({
                                        id,
                                        name,
                                        img,
                                        departmentId,
                                      })
                                    }
                                  >
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
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Category;
