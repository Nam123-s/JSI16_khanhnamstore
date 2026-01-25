import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOrcd9E7Efk1FYFQ7O2roVyElAMZi1MDM",
  authDomain: "pnl-jsi16.firebaseapp.com",
  projectId: "pnl-jsi16",
  storageBucket: "pnl-jsi16.firebasestorage.app",
  messagingSenderId: "912897970465",
  appId: "1:912897970465:web:0a7a7b66ef57603a922e60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 1. Cách đăng ký tài khoản bằng Email/Password
const registerForm = document.querySelector("#register-form");

function handleRegister(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

// Lấy giá trị từ các input
  let username = document.querySelector("#inpUsername").value;
  let email = document.querySelector("#inpEmail").value;
  let password = document.querySelector("#inpPwd").value;
  let confirmPassword = document.querySelector("#inpConfirmPwd").value;
  let role_id = "user";
  if (email === "admin@example.com") {
    role_id ="admin"  // Mặc định là quyền của guest (admin: Admin, user: Guest)
  }else {
    role_id ="user"
  }

  // Check fields empty
  if (!username || !email || !password || !confirmPassword) {
    alert("Vui lòng điền đủ các trường");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }

  // Tạo tài khoản  Firebase Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      var user = userCredential.user;

      // Thông tin người dùng
      let userData = {
        username,
        email,
        password,
        role_id,
        balance: 0, //  
      };

      // Thêm user vào Firestore
      addDoc(collection(db, "users"), userData)
        .then(() => {
          alert("Đăng ký thành công!");
          window.location.href = "./login.html";
          console.log("Document written with ID: ", user.uid);
        })
        .catch((error) => {
          alert("Đăng ký thất bại");
          console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      alert("Lỗi: " + errorMessage);
      console.log(errorMessage);
    });
}

registerForm.addEventListener("submit", handleRegister);

//  đăng nhập với Email/Password
const loginForm = document.querySelector("#login-form");

function handleLogin(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  // Lấy giá trị từ các input
  let email = document.querySelector("#inpEmail-login").value;
  let password = document.querySelector("#inpPwd-login").value;

  // Kiểm tra các trường có trống không
  if (!email || !password) {
    alert("Vui lòng điền đủ các trường");
    return;
  }

  // Đăng nhập với Firebase Auth
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      const userData = JSON.stringify(user);
      console.log("User data:", userData.role_id);

      // Lưu vào localStorage
      localStorage.setItem("user_session", userData);
      
      // Thông báo thành công
      console.log("Đăng nhập thành công!");
      alert("Đăng nhập thành công!");
      
      // Chuyển hướng tới trang chủ
      window.location.href = "../index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Lỗi đăng nhập: " + errorMessage);
      alert("Mật khẩu không đúng");
    });
}

loginForm.addEventListener("submit", handleLogin);
