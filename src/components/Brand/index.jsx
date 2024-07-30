import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBrands } from "../../redux/actions/actions";
import { baseUrl, fetchBrands } from "../../redux/actions";

function Brand() {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brandsState);

  // useEffect(() => {
  //   if (!brands) {
  //     console.log("Fetching Brands");
  //     dispatch(fetchBrands());
  //   }
  // }, []);

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

  function deleteBrand(brand) {
    axios
      .delete(`${baseUrl}/api/Brands?id=${brand.id}`)
      .then((res) => {
        dispatch(setBrands(brands.filter((el) => el.id != brand.id)));
        Swal.fire({
          title: `تم حذف الماركة ${brand.name}`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire("Something went wrong", "", "error");
      });
  }

  return (
    <div className="body-content">
      <div className="title-page">
        <div className="img-title">
          <h5>الماركات</h5>
        </div>
      </div>
      <div className="box-section">
        <div className="col-md-12 text-end mb-3 px-3 pt-3">
          <Link className="btn btn-theme" to="/brand/add">
            إضافة ماركة جديد
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
                <th>صوره الماركة</th>
                <th>اسم الماركة</th>
                <th>التحكم</th>
              </tr>
            </thead>
            <tbody>
              {brands?.map((brand, index) => {
                return (
                  <tr key={brand.id}>
                    <td className="promotion-id" scope="row">
                      {index + 1}
                    </td>
                    <td data-title="صورة الخدمة">
                      <img width="60px" src={brand.img} />
                    </td>
                    <td data-title="إسم الخدمة Ar"> {brand.name}</td>

                    <td className="control-btn">
                      <div className="d-flex">
                        <Link
                          className="btn btn-details edit"
                          to={`/brand/edit/${brand.id}`}
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
                                  onClick={() => deleteBrand(brand)}
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Brand;
