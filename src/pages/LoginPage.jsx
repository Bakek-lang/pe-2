import useNumberStore from "../js/store/useNumberStore";

export default function LoginPage() {
  const { number, increase, decrease, setNumber } = useNumberStore();

  return (
    <div>
      <div className="flex flex-col items-center mb-52">
        <h1>Current Number: {number}</h1>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
        <button onClick={() => setNumber(100)}>Set to 100</button>
      </div>
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
    </div>
  );
}
