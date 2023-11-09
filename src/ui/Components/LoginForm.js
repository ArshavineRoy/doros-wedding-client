import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setTokensInCookies } from "../features/auth/authCookies";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlicerLogin";
import { useLoginMutation } from "../features/auth/authMutations";
import Loader from "../../ui/Loader";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [useremail, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [useremail, pwd]);

  const validateEmail = (useremail) => {
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailpattern.test(useremail);
  };

  const validatePassword = (password) => {
    const passwordpattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordpattern.test(password);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email: useremail, password: pwd });
      const { email, accessToken, refreshToken } = userData;

      // set token in cookies
      setTokensInCookies(
        userData.data["access-token"],
        userData.data["refresh-token"]
      );
      //   setTokensInCookies(userData.accessToken, userData.refreshToken);

      dispatch(setCredentials({ email, accessToken, refreshToken }));
      setEmail("");
      setPwd("");
      navigate("/myevents");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      if (errMsg.current) {
        errRef.current.focus();
      }
    }

    if (!validateEmail(useremail)) {
      setErrMsg("Invalid email format");

      if (useremail.current) {
        emailRef.current.focus();
      }

      return;
    }
    if (!validatePassword(pwd)) {
      setErrMsg("Password should be atleast 8 characters");
      if (pwd.current) {
        errRef.current.focus();
      }

      return;
    }
  };

  const handleUserEmail = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <Loader></Loader>
  ) : (
    <section className="login">
      <div>
        <section className="bg-[#F7F2EE] items-center h-full">
          <div className="flex flex-col items-center justify-center py-32 px-6 mx-auto md:h-screen lg:py-0">
            <div className="bg-red-600">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-[#592727] my-2 md:text-2xl">
                  Log in
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#592727]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      autoComplete="username"
                      required=""
                      onChange={handleUserEmail}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-[#592727]"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={handlePwdInput}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
                      >
                        {passwordVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#592727]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4c-4 0-7.5 4-7.5 4s3.5 4 7.5 4 7.5-4 7.5-4-3.5-4-7.5-4zm0 5c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 8c-2.33 0-4.474-.674-6.29-1.828-.17-.112-.37-.172-.578-.172a2 2 0 00-2 2 2 2 0 002 2c.175 0 .348-.03.508-.086.488.58 1.276 1.086 2.292 1.86 2.662 1.774 4.634 2.954 5.7 3.5a.7.7 0 00.6 0c1.066-.546 3.038-1.726 5.7-3.5a2.02 2.02 0 002.292-1.86c.16.057.333.086.508.086a2 2 0 002-2 2 2 0 00-2-2c-.207 0-.407.06-.578.172C16.474 16.326 14.33 17 12 17z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#592727]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4a7.96 7.96 0 00-2 .267A7.968 7.968 0 005.773 5.77a.5.5 0 00-.14.28.5.5 0 00.138.28 7.963 7.963 0 004.158 2.632A2.992 2.992 0 008 11a3 3 0 102-5.77 7.968 7.968 0 001.773-1.503A7.96 7.96 0 0012 4zM2 12a10 10 0 0020 0H2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-start"></div>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#73332D] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Log In
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-800">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-blue-600 hover:underline dark:text-primary-500"
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
  );

  return content;
};
export default Login;
