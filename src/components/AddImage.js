import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { addImage } from "../store/imageSlice";

const AddImage = () => {
  const categories = useSelector((state) => state.category.categories);

  const [category, setCategory] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (!category) {
      setError(true);
      return;
    }
    setError(false);
    setLoader(true);
    addImage({ ...data, category }).then(() => {
      setLoader(false);
      reset();
      setCategory();
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 bg-base-200 rounded-xl"
      >
        <div className="text-xl font-semibold mb-3">Add Wallpaper</div>
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
            {...register("description")}
          ></textarea>
          {errors.description && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                Description is required.
              </span>
            </label>
          )}
        </div>
        <div className="dropdown mt-5">
          <div tabIndex="0" className="select flex items-center w-52">
            {category ? category.name : "Choose category"}
          </div>
          <ul
            tabIndex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-sm"
          >
            {categories.map((obj) => (
              <li key={obj.id}>
                <a onClick={() => setCategory(obj)}>{obj.name}</a>
              </li>
            ))}
          </ul>
          {error && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                Category is required.
              </span>
            </label>
          )}
        </div>
        <div className="form-control mt-2">
          <label className="label">
            <span className="label-text">Wallpaper</span>
          </label>
          <input
            type="file"
            className="text-sm ml-1"
            accept="image/*"
            multiple={false}
            {...register("wallpaper", { required: true })}
          />
          {errors.wallpaper && (
            <label className="label">
              <span className="label-text-alt text-red-500">
                Upload an image.
              </span>
            </label>
          )}
        </div>
        <div className="form-control mt-2">
          <label className="label">
            <span className="label-text">Creator name</span>
          </label>
          <input type="text" className="input" {...register("creator.name")} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Link related to creator</span>
          </label>
          <input type="text" className="input" {...register("creator.link")} />
        </div>
        <div className="form-control mt-2">
          <label className="label">
            <span className="label-text">Other information</span>
          </label>
          <textarea
            className="textarea h-24"
            {...register("creator.info")}
          ></textarea>
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

export default AddImage;
