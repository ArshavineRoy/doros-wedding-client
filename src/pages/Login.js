import React ,{useEffect}from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { login, reset } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user, isLoading, isError, isSuccess} = useSelector(state => state.auth)

  

  const validateEmail = (email) => {
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailpattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordpattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordpattern.test(password);
  };

  const onSubmit = (data) => {
    if (!validateEmail(data.email)) {
      console.log("Invalid email format");
    }
    if (!validatePassword(data.password)) {
      console.log("invalid password");
    }
    dispatch(login(data))
  };

  useEffect(() => {
    if(isError){
      console.log("Failed login")
    }
    if(isSuccess || user ){
      navigate('events')
      
    }
    dispatch(reset())

  }, [ user, isSuccess])
  return (
    <>
      <section className="login">
        <div>
          <section className="bg-white-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a
                href="/"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                Login
              </a>

              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        {...register("email")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        {...register("password")}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="flex items-start"></div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <Link
                        to="/register"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Login;
