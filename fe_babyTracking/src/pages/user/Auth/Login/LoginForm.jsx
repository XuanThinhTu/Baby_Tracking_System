import { useNavigate } from "react-router-dom";
import LinkToGoogle from "../Google/LinkToGoogle";
import { useEffect, useState } from "react";
import {
  getUserInformation,
  loginFucntion,
} from "../../../../services/APIServices";
// import { fetchLogin } from "../../../data/api.jsx";
// import { toast, Toaster } from "react-hot-toast";

const LoginForm = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchLogin = async () => {
    try {
      const result = await loginFucntion(email, password);
      const token = result?.data?.accessToken;

      if (token) {
        sessionStorage.setItem("token", token);

        const userInfo = await getUserInformation();

        if (userInfo.data?.role === "ROLE_ADMIN") {
          navigation("/admin");
        } else {
          navigation("/");
        }
      }
    } catch (error) {
      alert(error?.message);
    }
  };

  return (
    <div className="w-full px-10 py-12 rounded-3xl border-solid border-2 border-[rgba(0,0,0,0.1)] shadow-2xl">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Vui lòng điền thông tin của bạn!
      </p>

      <div className="mt-8">
        <form>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Địa Chỉ Email</label>
            <input
              className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
              type="email"
              placeholder="Nhập email..."
              onChange={(e) => setEmail(e.target.value)}
            // disabled
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Mật Khẩu</label>
            <input
              className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
              type="password"
              placeholder="Nhập mật khẩu..."
              onChange={(e) => setPassword(e.target.value)}
            // disabled
            />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" /*disabled*/ />
              <label className="ml-2 font-medium text-base" htmlFor="remember">
                Lưu mật khẩu
              </label>
            </div>
            <a
              className="font-medium text-base text-violet-500"
              href="/forgot-password"
            >
              Quên mật khẩu?
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="button"
              className=" py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
              onClick={() => fetchLogin()}
            >
              Đăng Nhập
            </button>

            <div>
              <LinkToGoogle headline="Đăng Nhập Bằng Google" />
            </div>
          </div>
        </form>

        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Không có tài khoản?</p>
          <a
            href="/register"
            className="ml-2 font-medium text-base text-violet-500"
          >
            Đăng Ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;