// import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
// import {
//   getFirestore,
//   doc,
//   getDoc,
// } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
// import { app } from "./config/config.js";

// // Initialize Firebase
// const db = getFirestore(app);
// const auth = getAuth(app);
// window.addEventListener("load", async () => {
//   const user = JSON.parse(localStorage.getItem("user_session"));
//   if (user) {
//     const db = getFirestore(app);
//     const userDoc = await getDoc(doc(db, "users", user.uid));
//     console.log("User doc exists:", userDoc.exists());
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         console.log("User data:", userData);
//         console.log("User role_id:", userData.role_id);
//         if (userData.role_id === "admin") {
//           document.getElementById("adminPage").style.display = "block";
//           console.log("Bạn đã đăng nhập với quyền admin.");
//         } else {
//           document.getElementById("adminPage").style.display = "none";
//           alert("Bạn không có quyền truy cập trang này!");
//         }
//       } else {
//         console.log("người dùng không tồn tại!");
//         document.getElementById("adminPage").style.display = "none";
//       }
//     } else {
//       console.log("không có người dùng trong localStorage!");
//       document.getElementById("adminPage").style.display = "none";
//     }

// });
/*Kiểm tra role người dùng khi đăng nhập
kiểm tra trên firebase nếu role = admin xuất hiện tab admin
Nếu không thì ẩn tab admin đi
*/
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { app } from "./config/config.js";
window.addEventListener("load", async () => {
  const user = JSON.parse(localStorage.getItem("user_session"));
  console.log("Current user:", user);
  if (user) {
    const db = getFirestore(app);
    const userDoc = await getDoc(doc(db, "users", user.uid));
    console.log("User doc exists:", userDoc.exists());
    if (userDoc.exists()) {
      const userData = userDoc.data();  
      console.log("User data:", userData);
      console.log("User role:", userData.role_id);
      if (userData.role_id === "admin") {
        document.getElementById("adminPage").style.display = "block";
        console.log("Admin page shown");
      } else {
        document.getElementById("adminPage").style.display = "none";
        console.log("Admin page hidden");
      }
    } else {
      console.log("User doc does not exist");
      // kiểm tra nếu email là admin
      if (user.email === "admin@example.com") {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role_id: "admin",
          balance: 0,
        });
        document.getElementById("adminPage").style.display = "block";
        console.log("Created admin doc and shown admin page");
      } else {
        document.getElementById("adminPage").style.display = "none";
      }
    }
  } else {
    console.log("No user in localStorage");
    document.getElementById("adminPage").style.display = "none";
  }
});
