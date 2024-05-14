import { FiLogOut } from "react-icons/fi";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <button
      className={cn(
        "w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:opacity-80",
        className
      )}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </button>
  );
};

export default LogoutButton;
