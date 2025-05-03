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
      <img src={"/icons/logout.svg"} alt="Logout Icon" className="w-4 h-4" />
      Logout
    </button>
  );
}

export default LogoutButton;
