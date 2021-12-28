import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";

export const addImage = async (obj) => {
  const storeRef = ref(
    storage,
    `images/${obj.name.replace(/\s+/g, "-").toLowerCase()}`
  );
  const snapshot = await uploadBytes(storeRef, obj.wallpaper[0]);
  const url = await getDownloadURL(snapshot.ref);
  const dataObj = {
    name: obj.name,
    description: obj.description,
    source: url,
    categoryName: obj.category.name,
    categoryId: obj.category.id,
    timestamp: serverTimestamp(),
  };
  if (obj.creator.name) {
    dataObj.creator = {
      name: obj.creator.name,
      link: obj.creator.link,
      info: obj.creator.info,
    };
  }
  await addDoc(collection(db, "images"), dataObj);
};
