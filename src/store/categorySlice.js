import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";

const initialState = {
  categories: [],
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const categoriresCollectionRef = collection(db, "categories");
    const data = await getDocs(categoriresCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (obj) => {
    const storeRef = ref(
      storage,
      `categories/${obj.name.replace(/\s+/g, "-").toLowerCase()}`
    );
    const snapshot = await uploadBytes(storeRef, obj.thumbnail[0]);
    const url = await getDownloadURL(snapshot.ref);
    const dataObj = {
      name: obj.name,
      description: obj.description,
      thumbnail: url,
    };
    const docRef = await addDoc(collection(db, "categories"), dataObj);
    return { ...dataObj, id: docRef.id };
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export default categorySlice.reducer;
