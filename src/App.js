import React, { useEffect } from "react";

import AddCategory from "./components/AddCategory";
import Header from "./components/Header";
import AddImage from "./components/AddImage";
import "./App.css";
import { getCategories } from "./store/categorySlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="px-5 py-5">
        <div className="text-3xl font-bold text-slate-700">Admin Panel</div>
      </div>
      <div className="px-5 grid md:grid-cols-2 gap-8">
        <AddImage />
        <AddCategory />
      </div>
    </>
  );
};

export default App;
