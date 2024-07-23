import { Link } from "react-router-dom";

function Product() {
  return (
    <div className="body-content">
      <div className="title-page">
        <div className="img-title">
          <h5>الخدمات التصميمية </h5>
        </div>
      </div>
      <div className="box-section">
        <div className="col-md-12 text-end mb-3 px-3 pt-3">
          <Link className="btn btn-theme" to="/product/add">
            إضافة منتج جديد
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
                <th>صورة الخدمة</th>
                <th>إسم الخدمة Ar</th>
                <th>إسم الخدمة En</th>
                <th>تفاصيل الخدمة Ar</th>
                <th>تفاصيل الخدمة En</th>
                <th>التحكم</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="promotion-id" scope="row">
                  1
                </td>
                <td data-title="صورة الخدمة">
                  {" "}
                  <img width="60px" src="" />{" "}
                </td>
                <td data-title="إسم الخدمة Ar"> التصميم الداخلى</td>
                <td data-title="إسم الخدمة En"> Internal Design</td>
                <td data-title="تفاصيل الخدمة Ar">
                  {" "}
                  تقديم تصاميم داخلية عصرية ومتنوعة تلبى جميع الاذواق
                </td>
                <td data-title="تفاصيل الخدمة En">
                  {" "}
                  Providing modern and diverse interior designs that meet all
                  tastes
                </td>

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
              <tr>
                <td className="promotion-id" scope="row">
                  2
                </td>
                <td data-title="صورة الخدمة">
                  {" "}
                  <img width="60px" src="/assets/img/calculator.svg" />{" "}
                </td>
                <td data-title="إسم الخدمة Ar"> المخططات التنفيذية</td>
                <td data-title="إسم الخدمة En"> Executive plans</td>
                <td data-title="تفاصيل الخدمة Ar">
                  {" "}
                  عداد مخططات تنفيذية دقيقة وشاملة لكل مشروع
                </td>
                <td data-title="تفاصيل الخدمة En">
                  {" "}
                  Preparing accurate and comprehensive implementation plans for
                  each project
                </td>

                <td className="control-btn">
                  <div className="d-flex">
                    <a
                      className="btn btn-details edit"
                      href="/Categories/FormEdit/2"
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
