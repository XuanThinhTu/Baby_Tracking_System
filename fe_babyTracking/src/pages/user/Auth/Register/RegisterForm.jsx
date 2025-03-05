import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LinkToGoogle from "../Google/LinkToGoogle";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { registerFunction } from "../../../../services/APIServices";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const [errorList, setErrorList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 1. Gọi API đăng ký
      const res = await registerFunction(formValues);

      // 2. Giả sử API trả về token => lưu token
      if (res?.token) {
        sessionStorage.setItem("token", res.token);
        toast.success("Đăng ký thành công!");
        navigate("/my-family");
      } else {
        // Nếu không có token trả về, gọi loginFunction
        const loginRes = await loginFucntion(formValues.email, formValues.password);
        if (loginRes?.token) {
          sessionStorage.setItem("token", loginRes.token);
          toast.success("Đăng ký thành công!");
          navigate("/my-family");
        } else {
          toast.error("Đăng ký xong nhưng không tự động đăng nhập được!");
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đăng ký.");
      console.error(error);
    }
  };


  return (
    <div className="w-full px-10 py-12 rounded-3xl border-solid border-2 border-[rgba(0,0,0,0.1)] shadow-2xl">
      <h1 className="text-5xl font-semibold">Welcome</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Vui lòng điền thông tin của bạn!</p>

      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="w-full flex gap-3">
          {/* Họ */}
          <div className="w-1/2 flex flex-col">
            <label className="text-lg font-medium">Họ</label>
            <input name="lastName" onChange={handleChange} value={formValues.lastName} className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent" placeholder="Nhập họ..." required />
          </div>
          {/* Tên */}
          <div className="w-1/2 flex flex-col">
            <label className="text-lg font-medium">Tên</label>
            <input name="firstName" onChange={handleChange} value={formValues.firstName} className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent" placeholder="Nhập tên..." required />
          </div>
        </div>
        {/* Địa chỉ email */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Địa Chỉ Email</label>
          <input name="email" onChange={handleChange} value={formValues.email} className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent border-[rgba(0,0,0,0.2)]" placeholder="Nhập email..." type="email" required />
        </div>
        {/* Số điện thoại */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Số Điện Thoại</label>
          <input name="phone" onChange={handleChange} value={formValues.phone} className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent border-[rgba(0,0,0,0.2)]" placeholder="Nhập số điện thoại..." required />
        </div>
        {/* Địa chỉ */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Địa Chỉ</label>
          <input name="address" onChange={handleChange} value={formValues.address} className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent border-[rgba(0,0,0,0.2)]" placeholder="Nhập địa chỉ..." required />
        </div>
        {/* Mật khẩu */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Mật Khẩu</label>
          <input name="password" onChange={handleChange} value={formValues.password} className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent" placeholder="Nhập mật khẩu..." type="password" required />
        </div>
        {/* Nút Đăng Ký */}
        <div className="mt-8 flex flex-col gap-y-4">
          <button type="submit" className="py-4 bg-violet-500 rounded-xl text-white font-bold text-lg">Đăng Ký</button>
          <div>
            <LinkToGoogle headline="Đăng Nhập Bằng Google" />
          </div>
        </div>
        {/* Điều hướng Đăng Nhập */}
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Bạn đã có tài khoản?</p>
          <a href="/login" className="ml-2 font-medium text-base text-violet-500">Đăng Nhập</a>
        </div>
      </form>
    </div>

  );
};

export default RegisterForm;
