import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm flex justify-between">
      <div className="flex">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <>
          <div className="flex gap-5">
            <Link to="/profile">Profile</Link>
            <Link to="/connections">Connections</Link>
            <Link to="/requests">Requests</Link>
          </div>
          <div className="flex gap-2 items-center">
            <p>Welcome {user.firstName}</p>
            <div className="w-10 rounded-full">
              <img alt="profile url" src={user.imageUrl} />
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
