import { useNavigate } from "react-router-dom";
// import LinkToGoogle from "../Google/LinkToGoogle";
// import { fetchRegister } from "../../../data/api.jsx";
// import { toast } from "react-hot-toast";

const RegisterForm = () => {
    const navigate = useNavigate();
    //   const [formValues, setFormValues] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirm_password: "",
    //   });

    //   const [errorList, setErrorList] = useState([]);

    //   const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormValues({
    //       ...formValues,
    //       [name]: value,
    //     });
    //   };

    //   const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const { username, email, password, confirm_password } = formValues;
    //     await fetchRegister({
    //       username,
    //       email,
    //       password,
    //       confirm_password,
    //     })
    //       .then((res) => {
    //         toast.success(`${res.data.message}`);
    //         localStorage.setItem("user", JSON.stringify(res.data.user));
    //         localStorage.setItem("result", JSON.stringify(res.data.result));
    //         navigate("/otp", {
    //           state: { navigateTo: "/profile", email, user_id: res.data.user._id },
    //         });
    //       })
    //       .catch((error) => {
    //         toast.error("Có lỗi xảy ra khi đăng ký.");
    //         let errorList = [];
    //         for (let value of Object.values(error.response.data.errors)) {
    //           errorList.push(value);
    //           setErrorList(errorList);
    //         }
    //       });
    //   };

    return (
        <div className="w-full px-10 py-12 rounded-3xl border-solid border-2 border-[rgba(0,0,0,0.1)] shadow-2xl">
            <h1 className="text-5xl font-semibold">Welcome</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
                Vui lòng điền thông tin của bạn!
            </p>

            <form className="mt-8">
                <div className="w-full flex gap-3">
                    {/* Tên tài khoản */}
                    <div className="w-1/3 flex flex-col">
                        <label className="text-lg font-medium">Tên Tài Khoản</label>
                        <input
                            className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Nhập tên tài khoản..."
                        // disabled
                        />
                    </div>
                    {/* Địa chỉ email */}
                    <div className="w-2/3 flex flex-col">
                        <label className="text-lg font-medium">Địa Chỉ Email</label>
                        <input
                            className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent border-[rgba(0,0,0,0.2)]"
                            placeholder="Nhập email..."
                        // disabled
                        />
                    </div>
                </div>

                {/* Mật khẩu */}
                <div className="flex flex-col mt-4">
                    <label className="text-lg font-medium">Mật Khẩu</label>
                    <input
                        className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Nhập mật khẩu..."
                        type="password"
                    // disabled
                    />
                </div>

                {/* Nhập lại mật khẩu */}
                <div className="flex flex-col mt-4">
                    <label className="text-lg font-medium">Nhập Lại Mật Khẩu</label>
                    <input
                        className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Nhập lại mật khẩu..."
                        type="password"
                    // disabled
                    />
                </div>

                {/* Nút Đăng Ký */}
                <div className="mt-8 flex flex-col gap-y-4">
                    <button
                        type="button"
                        className="cursor-not-allowed py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
                    // disabled
                    >
                        Đăng Ký
                    </button>

                    <div>
                        <button
                            type="button"
                            className="w-full py-4 bg-gray-200 text-gray-700 rounded-xl font-medium text-lg cursor-not-allowed"
                        // disabled
                        >
                            Đăng Ký Bằng Google
                        </button>
                    </div>
                </div>

                {/* Điều hướng Đăng Nhập */}
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Bạn đã có tài khoản?</p>
                    <a href="/login" className="ml-2 font-medium text-base text-violet-500">
                        Đăng Nhập
                    </a>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
