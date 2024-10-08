import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="Sidebar">
        <div className="SidebarHeader">
          <Link to="/">
            <img src="/assets/img/logo.png" className="h-50px logo" />
          </Link>
        </div>
        <div className="SidebarBody">
          <section>
            <ul className="no-style">
              <li>
                <Link
                  className="Home-link sidebar-icon-img border-bottom"
                  to="/dashboard/department/index"
                >
                  <img src="/assets/img/3d-house.png" />
                  <span>الاقسام</span>
                </Link>
                <ul className="no-style">
                  <li>
                    <Link to="/dashboard/category/index">
                      <img src="/assets/img/banner.png" />
                      <span>الانواع</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/brand/index">
                      <img src="/assets/img/user2.png" />
                      <span>الماركات</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/product/index">
                      <img src="/assets/img/about.png" />
                      <span>المنتجات</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/productUnit/index">
                      <img src="/assets/img/customer.png" />
                      <span>الوحدات</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/color/index">
                      <img src="/assets/img/project.png" />
                      <span>الالوان</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/productImage/index">
                      <img src="/assets/img/subscribe.png" />
                      <span>صور المنتج</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/Admin/index">
                      <img src="/assets/img/ui.png" />
                      <span> المشرفين</span>
                    </Link>
                  </li>
                  {/* 
                  
                  <li>
                    <a href="/AdminWhyUs/FormEdit/3">
                      <img src="/assets/img/customer.png" />
                      <span>لماذا نحن</span>
                    </a>
                  </li>
                  <li>
                    <a href="/AdminProjects/Index">
                      <img src="/assets/img/project.png" />
                      <span>المشاريع</span>
                    </a>
                  </li>
                  <li>
                    <a href="/AdminSubscribe/Index">
                      <img src="/assets/img/subscribe.png" />
                      <span>الاشتراكات</span>
                    </a>
                  </li>

                  <li>
                    <a href="/AdminContactUs/Index">
                      <img src="/assets/img/project-status.png" />
                      <span>طلبات التواصل</span>
                    </a>
                  </li>

                  <li>
                    <a href="/AdminPartners/Index">
                      <img src="/assets/img/planing.png" />
                      <span>شركاء النجاح</span>
                    </a>
                  </li>

                  <li>
                    <a href="/AdminFaq/Index">
                      <img src="/assets/img/resume.png" />
                      <span>الاسئلة الشائعة</span>
                    </a>
                  </li>
                  <li className="super-admin">
                    <a href="/Admins/Index">
                      <img src="/assets/img/ui.png" />
                      <span>المشرفين</span>
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
