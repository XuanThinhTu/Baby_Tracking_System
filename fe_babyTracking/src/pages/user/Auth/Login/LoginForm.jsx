import { useNavigate } from "react-router-dom";
// import LinkToGoogle from "../Google/LinkToGoogle";
// import { fetchLogin } from "../../../data/api.jsx";
// import { toast, Toaster } from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  // const [formValues, setFormValues] = useState({
  //   email: sessionStorage.getItem('email') || "",
  //   password: sessionStorage.getItem('password') || "",
  // });
  // const [errorList, setErrorList] = useState([]);
  // const [rememberMe, setRememberMe] = useState(false);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };

  // const handleRememberMeChange = (event) => {
  //   setRememberMe(event.target.checked);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { email, password } = formValues;

  //   await fetchLogin({
  //     email,
  //     password,
  //   })
  //     .then((res) => {
  //       const user = res.data.user;
  //       localStorage.setItem("user", JSON.stringify(user));
  //       localStorage.setItem("result", JSON.stringify(res.data.result));

  //       if(user.verify === 0){
  //         toast.error("Vui lòng xác nhận email!", {
  //           duration: 5000,
  //         });
  //         navigate("/otp", {
  //           state: { navigateTo: "/profile", email: user.email, user_id: user._id }
  //         });
  //         return;
  //       }
  //       if(rememberMe){
  //         sessionStorage.setItem('email', email);
  //         sessionStorage.setItem('password', password);
  //       } else {
  //         sessionStorage.removeItem('email');
  //         sessionStorage.removeItem('password');
  //       }

  //       toast.success("Đăng nhập thành công!", {
  //         duration: 2000,
  //       });
  //       navigate("/");
  //       window.scrollTo(0, 0);
  //     })
  //     .catch((error) => {
  //       let errorList = [];
  //       for (let [key, value] of Object.entries(error.response.data.errors)) {
  //         errorList.push(value);
  //         setErrorList(errorList);
  //       }
  //       toast.error("Có lỗi xảy ra, vui lòng thử lại!", {
  //         position: "top-right",
  //         duration: 3000,
  //       });
  //     });
  // };

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
            // disabled
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Mật Khẩu</label>
            <input
              className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
              type="password"
              placeholder="Nhập mật khẩu..."
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
            <a className="font-medium text-base text-violet-500" href="/forgot-password">
              Quên mật khẩu?
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="button"
              className="cursor-not-allowed py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
              disabled
            >
              Đăng Nhập
            </button>

            <div>
              <button
                type="button"
                className="w-full py-4 bg-gray-200 text-gray-700 rounded-xl font-medium text-lg cursor-not-allowed"
                disabled
              >
                Đăng Nhập Bằng Google
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Không có tài khoản?</p>
          <a href="/register" className="ml-2 font-medium text-base text-violet-500">
            Đăng Ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
