import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOrcd9E7Efk1FYFQ7O2roVyElAMZi1MDM",
  authDomain: "pnl-jsi16.firebaseapp.com",
  projectId: "pnl-jsi16",
  storageBucket: "pnl-jsi16.firebasestorage.app",
  messagingSenderId: "912897970465",
  appId: "1:912897970465:web:0a7a7b66ef57603a922e60"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document
  .getElementById("create-product-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const fileInput = document.getElementById("product-image");
    const title = document.getElementById("product-title").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const description = document.getElementById("product-description").value;

    if (fileInput.files.length === 0) {
      alert("Vui lòng chọn hình ảnh!");
      return;
    }

    // ============= UPLOAD TO CLOUDINARY =============
    const cloudName = "dtxqtd990";
    const uploadPreset = "classJSI16";

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("upload_preset", uploadPreset);

    let imageUrl = "";
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (data.secure_url) {
        imageUrl = data.secure_url;
        console.log("Image uploaded successfully:", imageUrl);
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi tải ảnh lên Cloudinary!");
      return;
    }


    try {
      const productData = {
        title: title,
        price: price,
        description: description,
        image: imageUrl,
        createdAt: new Date()
      };

      await addDoc(collection(db, "products"), productData);
      alert("Sản phẩm đã được tạo thành công!");
      location.href = "index.html";
    } catch (err) {
      console.error(err);
      alert("Lỗi lưu sản phẩm!");
    }
  });

