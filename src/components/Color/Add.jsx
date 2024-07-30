import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setColors } from "../../redux/actions/actions";
import { fetchColors, baseUrl } from "../../redux/actions";

function AddColor() {
  let { colorID } = useParams();
  const [name, setName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [hasDiscount, setHasDiscount] = useState("0");
  const [productUnitID, setProductUnitID] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.colorsState);
  const { productUnits } = useSelector((state) => state.productUnitsState);

  const navigate = useNavigate();

  useEffect(() => {
    if (colorID && colors) {
      let color = colors?.find((el) => el.id == colorID);
      setName(color.colorName);
      setColorCode(color.colorCode);
      setQuantity(+color.quantity);
      setProductUnitID(color.productUnitId);
      setDiscount(color.priceBeforeDiscount - color.price);
      setPriceBeforeDiscount(color.priceBeforeDiscount);
      setHasDiscount(+color.hasDiscount);
    }
  }, [colors, colorID]);

  function addNewColor() {
    if (
      !name ||
      !colorCode ||
      !quantity ||
      !priceBeforeDiscount ||
      !productUnitID
    ) {
      Swal.fire({
        title: "ادخل البيانات",
        icon: "error",
        timer: 3000,
      });
      return false;
    }
    if (priceBeforeDiscount <= discount) {
      Swal.fire("الخصم أكبر من السعر", "", "error");
      return;
    }

    setIsDisabled(true);

    let data = {
      colorName: name,
      colorCode: colorCode.slice(colorCode.indexOf("#") + 1),
      quantity,
      price: priceBeforeDiscount - +discount,
      hasDiscount: hasDiscount == "0" ? false : true,
      priceBeforeDiscount,
      productUnitId: productUnitID,
    };

    if (colorID) {
      updateColor({ ...data, id: +colorID });
      return;
    }

    axios
      .post(`${baseUrl}/api/Colors`, data)
      .then((res) => {
        Swal.fire({
          title: `تم اضافة اللون ${name}`,
          icon: "success",
          timer: 3000,
        });

        dispatch(fetchColors());
        navigate("/color/index");
      })
      .catch((err) => {
        console.log("cause", err.message);
        setIsDisabled(false);
        Swal.fire("حدث خطأ", "", "error");
      });
  }

  function updateColor(data) {
    console.log("PUT Data", data);
    axios
      .put(`${baseUrl}/api/Colors?id=${colorID}`, data)
      .then((res) => {
        Swal.fire({
          title: `تم تعديل القسم ${name}`,
          icon: "success",
          timer: 3000,
        });
        dispatch(setColors(colors.map((el) => (el.id == colorID ? data : el))));
        navigate("/color/index");
      })
      .catch((err) => {
        setIsDisabled(false);
        Swal.fire("حدث خطأ", "", "error");
      });
  }

  function handleHasDiscount(e) {
    if (e.target.value == "0") {
      setDiscount("");
      setHasDiscount("0");
    } else setHasDiscount("1");
  }

  return (
    <div className="body-content">
      <div className="title-page">
        <div className="img-title">
          <h5>الالون</h5>
        </div>
        <h4
          className="p-2 text-white"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/color/index")}
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
                  required=""
                  type="text"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="Name"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="did-floating-label"> اسم اللون </label>
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
                  required=""
                  type="text"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="colorCode"
                  name="colorCode"
                  value={colorCode}
                  onChange={(e) => setColorCode(e.target.value)}
                />
                <label className="did-floating-label">كود اللون</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="colorCode"
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
                  required=""
                  type="number"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
                />
                <label className="did-floating-label">الكمية</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="colorCode"
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
                  required
                  id="collection"
                  name="collection"
                  value={productUnitID}
                  onChange={(e) => setProductUnitID(+e.target.value)}
                >
                  <option value="">اختر الوحده</option>
                  {productUnits?.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </select>
                <label className="did-floating-label">الوحده </label>
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
                <input
                  className="did-floating-input w-100 large-input form-control  lang-en"
                  type="number"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="price"
                  name="price"
                  value={priceBeforeDiscount}
                  onChange={(e) => setPriceBeforeDiscount(+e.target.value)}
                />
                <label className="did-floating-label">السعر</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="price"
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
                  id="hasDiscount"
                  name="hasDiscount"
                  value={hasDiscount}
                  onChange={(e) => handleHasDiscount(e)}
                >
                  <option value="0">لا</option>
                  <option value="1">نعم</option>
                </select>
                <label className="did-floating-label">له خصم ؟</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="discount"
                  data-valmsg-replace="true"
                ></span>
              </div>
            </div>
          </div>

          {+hasDiscount === 1 && (
            <div className="col-md-3 col-sm-6 ">
              <div className="container-form-input input-label">
                <div className="did-floating-label-content">
                  <input
                    className="did-floating-input w-100 large-input form-control  lang-en"
                    required=""
                    type="number"
                    data-val="true"
                    data-val-required="The Phone field is required."
                    id="discount"
                    name="discount"
                    value={discount}
                    onChange={(e) => setDiscount(+e.target.value)}
                  />
                  <label className="did-floating-label">قيمة الخصم</label>
                  <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="discount"
                    data-valmsg-replace="true"
                  ></span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="form-row row form-row-small">
          <div className="row m-0">
            <div className="col-md-12 text-end mb-3">
              <button
                type="button"
                className="btn btn-theme add-car"
                onClick={addNewColor}
                disabled={isDisabled}
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

export default AddColor;
