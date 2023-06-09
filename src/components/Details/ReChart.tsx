import { Fragment } from "react";
import classes from "./ReChart.module.scss";

import { createPriceRange } from "../../helper";
import { Cart } from "../../types";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ReChart: React.FC<{ cart: Cart }> = ({ cart }) => {
  // building data object
  const chartData = cart.products.map((prod, i) => {
    return {
      name: `Product ${i + 1}`,
      price: prod.price.toFixed(2),
      discPrice: (prod.discountedPrice / prod.quantity).toFixed(2),
    };
  });

  // building custom range for Y axis as one generated by the library sometimes draws polyline outside of the chart
  const allPrices = cart.products.map((prod) => prod.price);
  const priceRange = createPriceRange(allPrices);

  // building chart
  const chart = (
    <ResponsiveContainer>
      <LineChart data={chartData}>
        <Line
          type="linear"
          dataKey="price"
          stroke="rgb(100, 100 ,100)"
          strokeWidth="2"
        />
        <Line
          type="linear"
          dataKey="discPrice"
          stroke="rgb(140, 200, 0)"
          strokeWidth="2"
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis tickFormatter={(val) => `$${val}`} domain={priceRange} />
        <Tooltip />
        <Legend
          formatter={(val, entry, index) => {
            return index === 0 ? "Original Price" : "Discounted Price";
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className={classes.wrapper}>
      <Fragment>
        <header className={classes.header}>
          <ShoppingCartIcon />
          <h2> &nbsp;Cart {cart.id} - Prices Chart</h2>
        </header>
        <div className={classes.chart}>{chart}</div>
      </Fragment>
    </div>
  );
};

export default ReChart;
