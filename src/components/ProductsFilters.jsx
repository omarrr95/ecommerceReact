import Skeleton from "react-loading-skeleton";
import "./ProductsFilters.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setProducts } from "../redux/actions/actions";

function ProductsFilters() {
  const { categories } = useSelector((state) => state.categoriesState);
  const { productUnits } = useSelector((state) => state.productUnitsState);
  const { colors } = useSelector((state) => state.colorsState);
  const { products } = useSelector((state) => state.productsState);
  const dispatch = useDispatch();

  console.log({ products, categories, productUnits, colors });

  const [allProducts, setAllProducts] = useState(null);

  const [filters, setFilters] = useState({
    category: [],
    unit: [],
    color: [],
  });

  useEffect(() => {
    if (products && !allProducts) {
      setAllProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (products && allProducts && categories && productUnits && colors) {
      let products = [...allProducts];

      if (filters.category.length > 0) {
        console.log("Filter");

        products = products.filter((product) =>
          filters.category.includes(product.categoriesId)
        );
        console.log(products);
      }
      console.log(filters.unit);

      // if (filters.unit.length > 0) {
      //   products = products.filter((product) => {
      //     return filters.unit.includes(product.id);
      //   });
      // }

      dispatch(setProducts(products));
    }
  }, [filters]);

  function handleChange(e) {
    setFilters((filters) => {
      if (e.target.checked) {
        return {
          ...filters,
          [e.target.name]: [...filters[e.target.name], +e.target.value],
        };
      } else {
        return {
          ...filters,
          [e.target.name]: filters[e.target.name].filter(
            (el) => el != e.target.value
          ),
        };
      }
    });
  }

  if (!categories) {
    return <Skeleton height={350} />;
  }

  return (
    <aside className="products-filter sticky-top">
      <div className="subject">
        <h5>Category</h5>
        {categories?.map((cat) => (
          <div
            className="checkbox-group d-flex gap-2 align-items-center mb-2"
            key={cat.id}
          >
            <input
              type="checkbox"
              id={`category-${cat.name}`}
              name="category"
              value={cat.id}
              onChange={handleChange}
            />
            <label htmlFor={`category-${cat.name}`}>{cat.name}</label>
          </div>
        ))}
      </div>
      <div className="subject">
        <h5>Size</h5>
        {productUnits?.map((unit) => (
          <div
            className="checkbox-group d-flex gap-2 align-items-center mb-2"
            key={unit.id}
          >
            <input
              type="checkbox"
              id={`unit-${unit.name}`}
              name="unit"
              value={unit.id}
              onChange={handleChange}
            />
            <label htmlFor={`unit-${unit.name}`}>{unit.name}</label>
          </div>
        ))}
      </div>
      <div className="subject">
        <h5>Color</h5>
        <div className="colors d-flex flex-wrap gap-2">
          {colors?.map((color) => (
            <div
              className="checkbox-group color-group d-flex align-items-center mb-2"
              key={color.id}
            >
              <input
                type="radio"
                id={`color-${color.id}`}
                name="color"
                style={{ backgroundColor: `#${color.colorCode}` }}
                value={color.id}
                onChange={handleChange}
              />
              <label
                htmlFor={`color-${color.id}`}
                className="color"
                style={{ backgroundColor: `#${color.colorCode}` }}
              ></label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ProductsFilters;
