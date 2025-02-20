import { useState } from "react";
import useAuthStore from "../js/store/useAuthStore";
import { updateUser } from "../js/API/updateUser";
import useNotificationStore from "../js/store/useNotificationStore";
import { FaXmark } from "react-icons/fa6";

export default function ProfileEditForm({ setIsEditing }) {
  const { user, updateUserDetails, accessToken } = useAuthStore();
  const [bio, setBio] = useState(user.data.bio);
  const [avatar, setAvatar] = useState(user.data.avatar.url);
  const [venueManager, setVenueManager] = useState(
    user.data.venueManager ?? false
  );

  const { addNotification } = useNotificationStore();

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedUserData = {
      ...user.data,
      bio: bio,
      avatar: {
        ...user.data.avatar,
        url: avatar,
      },
      venueManager: venueManager,
    };

    try {
      const updatedUser = await updateUser(updatedUserData, user, accessToken);
      updateUserDetails(updatedUser);
      addNotification("Profile updated successfully!", "success");
      setIsEditing(false);
    } catch (error) {
      addNotification(`${error.message}`, "error");
    }
  }

  return (
    <div className="relative flex justify-center border border-gray-300 shadow-md rounded-lg w-full">
      <FaXmark
        size={30}
        className="absolute right-0 cursor-pointer "
        onClick={() => setIsEditing(false)}
      />
      <form onSubmit={handleSubmit} className="flex flex-col w-2/3  mt-4">
        <h1 className="text-center text-3xl mb-9">Update User Profile</h1>
        <input
          type="text"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
          className="mt-2 mb-2 p-1 border border-black rounded"
        />
        <textarea
          value={bio || ""}
          placeholder="No bio yet."
          onChange={(event) => setBio(event.target.value)}
          className="mt-2 mb-2 p-1 border border-black rounded"
        ></textarea>
        <div className="flex gap-4 text-xl mt-2">
          <label>Venue Manager:</label>
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={venueManager}
            onChange={() => setVenueManager((prev) => !prev)}
          />
        </div>

        <div className="flex justify-center p-4 ">
          <button
            type="submit"
            className="py-2 px-3 bg-blue-500 rounded-lg text-white w-1/2 mt-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
