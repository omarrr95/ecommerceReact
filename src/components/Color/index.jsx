import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setColors } from "../../redux/actions/actions";
import { baseUrl } from "../../redux/actions";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Color() {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.colorsState);
  const { productUnits } = useSelector((state) => state.productUnitsState);

  useEffect(() => {
    // if (!colors) {
    //   fetchColors();
    // }
  }, []);

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

  function deleteColor(color) {
    axios
      .delete(`${baseUrl}/api/Colors?id=${color.id}`)
      .then((res) => {
        dispatch(setColors(colors.filter((el) => el.id != color.id)));
        Swal.fire({
          title: `تم حذف القسم ${color.colorName}`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire("Something went wrong", "", "error");
      });
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="body-content">
        <div className="title-page">
          <div className="img-title">
            <h5>الألوان</h5>
          </div>
        </div>
        <div className="box-section">
          <div className="col-md-12 text-end mb-3 px-3 pt-3">
            <Link className="btn btn-theme" to="/dashboard/color/add">
              إضافة لون جديد
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
                  <th>إسم اللون </th>
                  <th>كود اللون</th>
                  <th>الشكل</th>
                  <th> الوحده</th>
                  <th> الكمية </th>
                  <th>السعر قبل الخصم</th>
                  <th>السعر الصافى</th>
                  <th>التحكم</th>
                </tr>
              </thead>
              <tbody>
                {colors?.map((color, index) => {
                  return (
                    <tr key={color.id}>
                      <td className="promotion-id" scope="row">
                        {index + 1}
                      </td>
                      <td data-title="صورة الخدمة">{color.colorName}</td>
                      <td data-title="إسم الخدمة Ar">{color.colorCode}</td>
                      <td data-title="إسم الخدمة Ar">
                        <span
                          style={{
                            backgroundColor: `#${color.colorCode}`,
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "block",
                            margin: "auto",
                          }}
                        ></span>
                      </td>
                      <td data-title="إسم الخدمة En">
                        {
                          productUnits?.find(
                            (el) => el.id == color.productUnitId
                          ).name
                        }
                      </td>
                      <td>{color.quantity}</td>
                      <td>
                        {color.hasDiscount ? (
                          <del>{color.priceBeforeDiscount}</del>
                        ) : (
                          color.priceBeforeDiscount
                        )}
                      </td>
                      <td>{color.price}</td>

                      <td className="control-btn">
                        <div className="d-flex">
                          <Link
                            className="btn btn-details edit"
                            to={`/dashboard/color/edit/${color.id}`}
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
                                    onClick={() => deleteColor(color)}
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
    </>
  );
}

export default Color;
