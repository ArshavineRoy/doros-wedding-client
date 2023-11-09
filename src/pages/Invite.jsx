import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import { toast } from "react-hot-toast";

const Invite = () => {
  const [errorMessage, setErrMsg] = useState("");
  const { eventId } = useParams();
  const { accessToken, refreshToken } = getTokensInCookies();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    invitee_email: "",
    invitee_phone: "",
    event_id: parseInt(eventId),
  });

  const addInvitee = async (newInvitee) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        "https://doros-wedding-server.onrender.com/invitees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify(newInvitee),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Successfully added an invitee!");
        navigate(`/dashboard/${eventId}`);
      } else {
        console.log("Failed to add invitee:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const validateEmail = (email) => {
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailpattern.test(email);
  };

  const validatePhonenumber = (phone) => {
    const phonenumberpattern = /^(?:254|0)[17]\d{8}$/;
    return phonenumberpattern.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!formData.invitee_email || !formData.invitee_phone) {
      setErrMsg("Please fill in all the fields");
    } else if (!validateEmail(formData.invitee_email)) {
      setErrMsg("Invalid Email Format");
    } else if (!validatePhonenumber(formData.invitee_phone)) {
      setErrMsg("Invalid Phone number");
    } else {
      addInvitee(formData);
    }
  };

  //   const handleUserEmail = (e) => setEmail(e.target.value);

  //   const handlePhoneInput = (e) => setPhone(e.target.value);

  return (
    <section className="login">
      <div>
        <section className="bg-[#F7F2EE] items-center h-full">
          <div className="flex flex-col items-center justify-center py-32 px-6 mx-auto md:h-screen lg:py-0">
            <div className="bg-red-600">
              <p
                className={errorMessage ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errorMessage}
              </p>
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-[#592727] my-2 md:text-2xl">
                  Invite a user
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#592727] "
                    >
                      Invitee's Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.invitee_email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          invitee_email: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 dark:text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-[#592727] "
                    >
                      Invitee's Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      value={formData.invitee_phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          invitee_phone: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="254712345678"
                      required=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#73332D] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Invite
                  </button>
                  <p className="text-sm font-light text-gray-800">
                    Back to{" "}
                    <Link
                      to={`/dashboard/${eventId}`}
                      className="font-medium text-blue-600 hover:underline "
                    >
                      your dashboard
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
};
export default Invite;
