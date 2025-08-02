import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions }) => {
  const { firstName, lastName, imageUrl, gender, age, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm my-5 select-none transition-transform">
      <figure className="px-10 pt-10">
        <img src={imageUrl} alt="user_image" className="rounded-xl w-50 h-50" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {Boolean(age && gender) && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {Boolean(skills.length) && <p>{skills}</p>}
        {showActions && (
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
