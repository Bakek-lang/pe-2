export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <form className="wax-w-xl py-8 px-4">
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded w-full py-2 px-4 border-black"
          />
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded w-full py-2 px-4 border-black"
          />
        </div>

        <button
          className="bg-blue-500 rounded-lg py-2 px-4 mt-2 text-white  "
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
