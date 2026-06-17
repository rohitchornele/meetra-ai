import { signOutAction } from "@/actions/authActions";
const SignOut = () => {
  return (
    <div
      className="px-6 py-1 mt-4 text-center border border-white/40
		  "
    >
      <form
        action={signOutAction}
        className=""
      >
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-lg transition hover:opacity-90">
          Logout
        </button>
      </form>
    </div>
  );
};
export default SignOut;
