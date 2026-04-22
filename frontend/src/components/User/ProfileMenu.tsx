import { MENU, type ProfileMenuItem } from "@/constants/profileMenu";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth.store.ts";
import { useEffect, useRef } from "react";
import { LogOut, Settings, User, Package } from "lucide-react";

interface ProfileMenuProps {
  onClose: () => void;
}

export const ProfileMenu = ({ onClose }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleClick = (item: ProfileMenuItem) => {
    if (item.label === "Logout") {
      logout();
      navigate("/");
    } else {
      navigate(item.path);
    }
    onClose();
  };

  const getIcon = (label: string) => {
    switch (label) {
      case "Profile":
        return <User size={16} />;
      case "Orders":
        return <Package size={16} />;
      case "Settings":
        return <Settings size={16} />;
      case "Logout":
        return <LogOut size={16} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={menuRef}
      className="
        absolute top-full right-0 mt-3 w-56 
        bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(120,60,0,0.15)] 
        border border-orange-50 overflow-hidden z-1001
        animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200
      "
    >
      <div className="bg-orange-50/50 px-6 py-4 border-b border-orange-100/50">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
          Personal Nook
        </p>
      </div>

      <ul className="p-2">
        {MENU.map((item) => (
          <li
            key={item.label}
            onClick={() => handleClick(item)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all
              ${
                item.label === "Logout"
                  ? "text-red-400 hover:bg-red-50 hover:text-red-600"
                  : "text-orange-950 hover:bg-orange-50 hover:text-orange-800"
              }
            `}
          >
            <span className="opacity-70">{getIcon(item.label)}</span>
            <span className="font-medium text-sm italic font-serif">
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="p-3 bg-orange-50/20 text-center">
        <div className="w-8 h-1 bg-orange-100 mx-auto rounded-full" />
      </div>
    </div>
  );
};
