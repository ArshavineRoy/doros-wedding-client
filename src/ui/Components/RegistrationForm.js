import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  startSignup,
  signupSuccess,
  signupFailure,
} from "../features/auth/authSlicerRegister";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../features/auth/authMutations";
import { selectsignUp } from "../features/auth/authSlicerRegister";

const RegistrationForm = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const signUpData = useSelector(selectsignUp);
  const navigate = useNavigate();
  const [errorMessage, setErrMsg] = useState("");

  const [register] = useSignupMutation();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    // username:'',
    email: "",
    phonenumber: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailpattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordpattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordpattern.test(password);
  };
  const validatePhonenumber = (phonenumber) => {
    const phonenumberpattern = /^(?:\+254|0)[17]\d{8}$/;
    return phonenumberpattern.test(phonenumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startSignup()); // Dispatch the first action of the user which is to enter details
    setErrMsg("");

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phonenumber ||
      !formData.password
    ) {
      setErrMsg("Please fill in all the fields");
      dispatch(signupFailure("Please fill in the required fields"));
    } else if (
      !/^[A-Z][a-zA-Z]*$/.test(formData.firstname || formData.lastname)
    ) {
      setErrMsg("Name must Start with a capital letter");
      dispatch(signupFailure("Name must start with a capital letter"));
    } else if (!validateEmail(formData.email)) {
      setErrMsg("Invalid Email Format");
      dispatch(signupFailure("Invalid Email Format"));
    } else if (!validatePassword(formData.password)) {
      setErrMsg("Password should be atleast 8 characters");
      dispatch(signupFailure("Password should be atleast 8 characters"));
    } else if (!validatePhonenumber(formData.phonenumber)) {
      setErrMsg("Invalid Phone number");
      dispatch(signupFailure("Invalid Phone number"));
    } else {
      try {
        // make regestration request using signupMutation
        const result = await register(formData);

        // Registration was successful
        dispatch(signupSuccess());
        setRegistrationSuccess(true);
        setIsLoading(true);
        navigate("/login");
      } catch (error) {
        // Registration failed, handle errors
        dispatch(signupFailure(error.message));
        setRegistrationSuccess(false);
      }
    }
  };

  return (
    <div>
      {signUpData.isLoading && <p>Signing up...</p>}
      {signUpData.errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}
      {registrationSuccess && <p>Registration successful!</p>}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite    
      </a> */}

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                {/* <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                      <input type="text" name="email" id="username" value={formData.username} 
                         onChange={(e) => setFormData({ ...formData, username: e.target.value })}className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div> */}
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={formData.firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter first name..."
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={formData.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter last name...."
                    required=""
                  />
                </div>
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="phonenumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    PhoneNumber
                  </label>
                  <input
                    type="number"
                    name="phonenumber"
                    id="phonenumber"
                    value={formData.phonenumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phonenumber: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0712345678"
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
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-yellow-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to='/login'
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationForm;
