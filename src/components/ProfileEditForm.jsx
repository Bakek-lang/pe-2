import { useState } from "react";
import useAuthStore from "../js/store/useAuthStore";
import { updateUser } from "../js/API/updateUser";

export default function ProfileEditForm() {
  const { user, updateUserDetails, accessToken } = useAuthStore();
  const [bio, setBio] = useState(user.data.bio);
  const [avatar, setAvatar] = useState(user.data.avatar.url);
  const [venueManager, setVenueManager] = useState(user.data.venueManager);

  console.log("Venue manager status: ", venueManager);

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

    console.log("user: ", user);
    console.log("updated user data: ", updatedUserData);

    try {
      const updatedUser = await updateUser(updatedUserData, user, accessToken);
      console.log("Update user is successful!", updatedUser);
      updateUserDetails(updatedUser);
    } catch (error) {
      console.log("Updating user failed", error.message);
    }
  }

  return (
    <div className="flex justify-center w-full">
      {" "}
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2  mt-4">
        <input
          type="text"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
          className="mb-2 p-1 border border-black rounded"
        />
        <textarea
          value={bio || ""}
          placeholder="No bio yet."
          onChange={(event) => setBio(event.target.value)}
          className="mb-2 p-1 border border-black rounded"
        ></textarea>
        <div className="flex gap-4 text-xl">
          <label>Venue Manager:</label>
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={venueManager}
            onChange={() => setVenueManager((prev) => !prev)}
          />
        </div>

        <div className="flex justify-center ">
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
