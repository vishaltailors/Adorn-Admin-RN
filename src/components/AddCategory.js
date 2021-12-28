import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../store/categorySlice";

const AddCategory = () => {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loader, setLoader] = useState(false);

  const onSubmit = (data) => {
    setLoader(true);
    dispatch(addCategory(data)).then(() => {
      setLoader(false);
      reset();
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 bg-base-200 rounded-xl"
      >
        <div className="text-xl font-semibold mb-3">Add Category</div>
        <div className="mb-5">
          <div className="ml-1 mb-1 text-sm font-medium">
            Current categories :
          </div>
          {categories.map((obj) => (
            <div
              key={obj.id}
              className="badge badge-info badge-lg text-sm mr-1 mt-1"
            >
              {obj.name}
            </div>
          ))}
        </div>
        <hr />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="input"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                Name is required.
              </span>
            </label>
          )}
        </div>
        <div className="form-control mt-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea h-24"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                Description is required.
              </span>
            </label>
          )}
        </div>
        <div className="form-control mt-2">
          <label className="label">
            <span className="label-text">Thumbnail</span>
          </label>
          <input
            type="file"
            className="text-sm ml-1"
            accept="image/*"
            multiple={false}
            {...register("thumbnail", { required: true })}
          />
          {errors.thumbnail && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                Thumbnail is required.
              </span>
            </label>
          )}
        </div>
        <div className="mt-5 float-right">
          <button className={`btn btn-primary ${loader ? "loading" : ""}`}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCategory;
