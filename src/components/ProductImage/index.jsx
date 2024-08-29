import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setProductImages } from "../../redux/actions/actions";
import { baseUrl } from "../../redux/actions";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function ProductImage() {
  const dispatch = useDispatch();
  const { productImages } = useSelector((state) => state.productImagesState);
  const { products } = useSelector((state) => state.productsState);

  let { productID } = useParams();
  const [images, setImages] = useState([]);

  console.log("PRODUCTS", products);
  useEffect(() => {
    setImages(productImages);
    if (productID) {
      setImages(productImages?.filter((el) => el.productId == productID) || []);
    }
  }, [productImages, productID]);

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

  function deleteProductImage(productImage) {
    axios
      .delete(`${baseUrl}/api/ProductImage?id=${productImage.id}`)
      .then((res) => {
        dispatch(
          setProductImages(
            productImages.filter((el) => el.id != productImage.id)
          )
        );
        Swal.fire({
          title: `تم حذف صوره المنتج ${productImage.id}`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
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
            <h5>صور المنتج</h5>
          </div>
        </div>
        <div className="box-section">
          <div className="col-md-12 text-end mb-3 px-3 pt-3">
            <Link className="btn btn-theme" to="/dashboard/productImage/add">
              إضافة قسم جديد
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
                  <th>صوره المنتج</th>
                  <th>اسم المنتج</th>
                  <th>التحكم</th>
                </tr>
              </thead>
              <tbody>
                {images?.map((productImage, index) => {
                  return (
                    <tr key={productImage.id}>
                      <td className="promotion-id" scope="row">
                        {index + 1}
                      </td>
                      <td data-title="صورة الخدمة">
                        <img width="60px" src={productImage.images} />
                      </td>
                      <td data-title="إسم الخدمة Ar">
                        {
                          products.find((el) => el.id == productImage.productId)
                            ?.name
                        }
                      </td>

                      <td className="control-btn">
                        <div className="d-flex">
                          <Link
                            className="btn btn-details edit"
                            to={`/dashboard/productImage/edit/${productImage.id}`}
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
                                      deleteProductImage(productImage)
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
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductImage;
