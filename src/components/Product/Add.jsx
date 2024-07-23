import { useParams } from "react-router-dom";

function AddProduct() {
  let { id } = useParams();

  return (
    <div className="body-content">
      <div className="title-page">
        <div className="img-title">
          <h5>البيانات الرئيسية</h5>
        </div>
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
              <div className="file-lable-container upload-img active">
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
                />
                <input type="hidden" className="input-form-image" />
                <div className="progress-container">
                  <div className="progress-bar"></div>
                  <div className="progress-text"></div>
                </div>
                <div className="control-image-upload">
                  <div className="control-image-upload-container">
                    <div className="file-name">
                      <span> Logo</span>
                    </div>
                    <div className="actions">
                      <i className="fa-regular fa-eye"></i>
                      <i className="fa-regular fa-trash-can"></i>
                    </div>
                  </div>
                </div>
                <div className="preview-container-modal">
                  <i className="fas fa-times"></i>
                  <div className="preview-container">
                    <div className="preview-container-img">
                      <img src="" alt="" />
                    </div>
                  </div>
                </div>
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
                  id="Phone"
                  name="Phone"
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
                  required=""
                  type="text"
                  data-val="true"
                  data-val-required="The color field is required."
                  id="color"
                  name="color"
                />
                <label className="did-floating-label"> اللون </label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="color"
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
                >
                  <option value="men">رجالى</option>
                  <option value="women">حريمى</option>
                  <option value="children">اطفاللى</option>
                </select>
                <label className="did-floating-label">النوع </label>
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
                <select
                  className="did-floating-input w-100 large-input form-control"
                  required
                  id="collection"
                  name="collection"
                >
                  <option value="men">1</option>
                  <option value="women">2</option>
                  <option value="children">3</option>
                </select>
                <label className="did-floating-label">القسم </label>
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
                <select
                  className="did-floating-input w-100 large-input form-control"
                  required
                  id="size"
                  name="size"
                >
                  <option value="x">x</option>
                  <option value="xl">xl</option>
                  <option value="xxl">xxl</option>
                </select>
                <label className="did-floating-label">المقاس</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="size"
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
                  id="price"
                  name="price"
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
                <input
                  className="did-floating-input w-100 large-input form-control  lang-en"
                  required=""
                  type="text"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="discount"
                  name="discount"
                />
                <label className="did-floating-label">الخصم</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="discount"
                  data-valmsg-replace="true"
                ></span>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 ">
            <div className="container-form-input input-label">
              <div className="did-floating-label-content">
                <textarea
                  className="did-floating-input w-100 large-input form-control  lang-en"
                  required=""
                  type="text"
                  data-val="true"
                  data-val-required="The Phone field is required."
                  id="description"
                  name="description"
                ></textarea>
                <label className="did-floating-label">الوصف</label>
                <span
                  className="text-danger field-validation-valid"
                  data-valmsg-for="description"
                  data-valmsg-replace="true"
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div className="form-row row form-row-small">
          <div className="row m-0">
            <div className="col-md-12 text-end mb-3">
              <button type="button" className="btn btn-theme add-car">
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
