import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    // If you use Redux for global user info, you may also want to clear that on logout.
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white text-md font-medium rounded hover:bg-blue-600 w-fit bg-indigo-600 hover:bg-indigo-700 rounded-md"
    >
      <img
        src={"/icons/logout.svg"}
        alt="Logout"
        className="w-6 h-6 sm:w-8 sm:h-8" // Adjust size for small and larger screens
      />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}

export default LogoutButton;
