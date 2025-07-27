import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("ankita@gmail.com");
  const [password, setPassword] = useState("Ankita@123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async () => {
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

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset border-base-300 rounded-box">
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
            <button className="btn btn-neutral mt-4" onClick={handleLogin}>
              Login
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
