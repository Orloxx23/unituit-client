import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

const getImg = async (img) => {
  const imgRef = ref(storage, img);

  getDownloadURL(imgRef)
    .then((url) => {
      console.log("obteniendo", imgRef, url);
      return url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error);
    });
};

const getNoAvatar = async () => {
  const imgRef = ref(storage, "images/person/noAvatar.png");
  let img = "";
  await getDownloadURL(imgRef)
    .then((url) => {
      img = url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error);
    });
  return img;
};

const getNoCover = async () => {
    const imgRef = ref(storage, "images/person/noCover.png");
    let img = "";
    await getDownloadURL(imgRef)
      .then((url) => {
        img = url;
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      });
    return img;
  };

export { getImg, getNoAvatar, getNoCover };
