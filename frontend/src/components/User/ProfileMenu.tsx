import { MENU, type ProfileMenuItem } from "@/constants/profileMenu";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth.store.ts";
import { useEffect, useRef } from "react";

import style from "./ProfileMenu.module.scss";

interface ProfileMenuProps {
  onClose: () => void;
}

export const ProfileMenu = ({ onClose }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

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
      onClose();
      return;
    }
    navigate(item.path);
    onClose();
  };
  return (
    <div className={style.profileWrapper}>
      {MENU.map((item) => (
        <li
          key={item.label}
          className={style["menu-btn"]}
          onClick={() => handleClick(item)}
        >
          {item.label}
        </li>
      ))}
    </div>
  );
};
