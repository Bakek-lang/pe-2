import { useState } from "react";
import useAuthStore from "../js/store/useAuthStore";

export default function ProfileEditForm() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user.data.name);
  const [bio, setBio] = useState(user.data.bio);
  const [avatar, setAvatar] = useState(user.data.avatar.url);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
      <input
        type="text"
        value={avatar}
        onChange={(event) => setAvatar(event.target.value)}
        className="mb-2 p-1 border border-black rounded"
      />
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="mb-2 p-1 border border-black rounded"
        placeholder="Name"
      />
      <textarea
        value={bio || "No bio yet."}
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
