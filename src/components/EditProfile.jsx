import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills.join(",") || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          imageUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-20 gap-10">
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset border-base-300 rounded-box">
              <label className="label">First Name</label>
              <input
                type="email"
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

              <label className="label">Image Url</label>
              <input
                type="text"
                className="input w-full"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />

              <label className="label">Age</label>
              <input
                type="text"
                className="input w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <label className="label">Gender</label>
              <select
                className="select select-primary"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option disabled>Choose one</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label className="label">About</label>
              <input
                type="text"
                className="input w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <label className="label">Skills</label>
              <input
                type="text"
                className="input w-full"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              {error && <p className="text-red-500">{error}</p>}
              <button className="btn btn-neutral mt-4" onClick={saveProfile}>
                Save
              </button>
            </fieldset>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, imageUrl, age, gender, about, skills }}
          showActions={false}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
