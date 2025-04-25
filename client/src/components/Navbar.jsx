import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import logo from '../../public/mortarboard.png';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logged out successfully");
      navigate("/login");
    }
  }, [isSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`h-16 fixed top-0 left-0 right-0 z-10 transition-colors duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md"
          : "bg-gradient-to-r from-[#F1F0E8] to-[#F1F0E8] dark:bg-gradient-to-r dark:from-[#213448] dark:to-[#213448]"
      }`}
    >
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="BitAcademy Logo"
            className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
          />
          <Link to={"/"}>
            <h1 className="hidden md:block font-semibold text-2xl text-slate-700 dark:text-[#d2eaec]">
              BitAcademy
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 dark:bg-[#1e293b] dark:text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning"> My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Sign Up</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="BitAcademy Logo"
            className="w-8 h-8 xs:w-10 xs:h-10 object-contain"
          />
          <h1
            className="font-extrabold text-2xl text-gray-900 dark:text-slate-100 cursor-pointer"
            onClick={() => navigate("/")}
          >
            BitAcademy
          </h1>
        </div>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 dark:hover:bg-[#334155]"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col dark:bg-[#0f172a] dark:text-white">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">BitAcademy</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2 dark:bg-[#334155]" />
        <nav className="flex flex-col space-y-4 mt-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p className="cursor-pointer" onClick={() => console.log("Logout clicked")}>
            Log Out
          </p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;