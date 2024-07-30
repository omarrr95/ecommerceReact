import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setProductUnits } from "../../redux/actions/actions.js";
import { baseUrl, fetchProductUnits } from "../../redux/actions/index.js";

function AddProductUnit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const { unitID } = useParams();

  const dispatch = useDispatch();
  const { productUnits } = useSelector((state) => state.productUnitsState);
  const { products } = useSelector((state) => state.productsState);

  useEffect(() => {
    if (unitID && productUnits) {
      let productUnit = productUnits?.find((el) => el.id == unitID);
      setName(productUnit.name);
      setDescription(productUnit.description);
      setProductId(productUnit.productId);
    }
  }, [productUnits, unitID]);

  function addNewProductUnit() {
    if (!description || !name || !productId) {
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
      description,
      productId,
    };

    if (unitID) {
      updateProductUnit({ ...data, id: +unitID });
      return;
    }

    console.log("POST", data);

    axios
      .post(`${baseUrl}/api/ProductUnit`, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: `تم اضافة الوحده ${name}`,
          icon: "success",
          timer: 3000,
        });
        dispatch(fetchProductUnits());
        clearInputs();
        navigate("/productUnit/index");
      })
      .catch((err) => {
        console.log("TheError", err, err.message);
        setIsDisabled(false);
        Swal.fire("حدث خطأ", "", "error");
      });
  }

  function updateProductUnit(data) {
    axios
      .put(`${baseUrl}/api/ProductUnit?id=${unitID}`, data)
      .then((res) => {
        Swal.fire({
          title: `تم تعديل الوحده ${name}`,
          icon: "success",
          timer: 3000,
        });
        dispatch(
          setProductUnits(
            productUnits.map((el) => (el.id == unitID ? data : el))
          )
        );
        clearInputs();
        navigate("/productUnit/index");
      })
      .catch((err) => {
        setIsDisabled(false);
        Swal.fire("حدث خطأ", "", "error");
      });
  }

  function clearInputs() {
    setName("");
    setDescription("");
    setProductId("");
  }

  return (
    <div className="body-content">
      <div className="title-page">
        <div className="img-title">
          <h5>تعديل الأنواع</h5>
        </div>
        <h4
          className="p-2 text-white"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/productUnit/index")}
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
                  الوحدات
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
                  id="description"
                  name="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label className="did-floating-label"> الوصف </label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="description"
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
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  <option value="">إختر المنتج</option>
                  {products?.map(({ id, name }) => {
                    return (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <label className="did-floating-label">المنتج </label>
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
                onClick={addNewProductUnit}
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
  );
}

export default AddProductUnit;
