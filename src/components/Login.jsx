import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      if (res.data.data) {
        dispatch(addUser(res.data.data));
        return navigate("/");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <fieldset className="fieldset border-base-300 rounded-box">
            {!isLoginForm && (
              <>
                <label className="label">First Name</label>
                <input
                  type="text"
                  className="input w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="label">Last Name</label>
                <input
                  type="text"
                  className="input w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}

            <label className="label">Email ID</label>
            <input
              type="email"
              className="input w-full"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500">{error}</p>}
            <button
              className="btn btn-neutral mt-4"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </fieldset>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
