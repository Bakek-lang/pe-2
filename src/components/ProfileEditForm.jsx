import { useState } from "react";
import useAuthStore from "../js/store/useAuthStore";
import { updateUser } from "../js/API/updateUser";

export default function ProfileEditForm() {
  const { user, updateUserDetails } = useAuthStore();
  const [bio, setBio] = useState(user.data.bio);
  const [avatar, setAvatar] = useState(user.data.avatar.url);

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedUserData = {
      ...user.data,
      bio: bio,
      avatar: {
        ...user.data.avatar,
        url: avatar,
      },
    };

    console.log("user: ", user);
    console.log("updated user data: ", updatedUserData);

    try {
      const updatedUser = await updateUser(updatedUserData, user);
      console.log("Update user is successful!", updateUser);
      updateUserDetails(updatedUser);
    } catch (error) {
      console.log("Updating user failed", error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
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
      <button
        type="submit"
        className="py-2 px-3 bg-blue-500 rounded-lg text-white"
      >
        Save Changes
      </button>
    </form>
  );
}
