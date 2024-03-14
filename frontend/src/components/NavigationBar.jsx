import {
    BellIcon,
    ChatBubbleLeftEllipsisIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthFormStore } from "../states/authFormState";
import { useUserStore } from "../states/userInfoState";
import { Login } from "./Login";
import { Register } from "./Register";
export function NavigationBar() {
    const RIGHT_NAV_LIST = ["About", "Business", "Blog"];
    const RIGHT_NAV_CLASSNAME =
        "p-2 bg-inherit shadow-none rounded-xl hover:shadow-none hover:underline underline-offset-1 hover:underline-offset-1 text-[#111111] text-lg capitalize ";
    // const AUTH_BUTTON_CLASSNAME =
    //     "px-3 py-2 shadow-none rounded-full hover:shadow-none text-lg capitalize transition-all duration-300 min-w-[100px]";
    const { setOpenLogin, setOpenSignUp, setFromNavBar } = useAuthFormStore();
    const { isAuthenticated } = useUserStore();
    const [isSearch, setIsSearch] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        const handleClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsSearch(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    return (
        <>
            <div className="flex justify-between items-center p-4 fixed top-0 bg-white w-screen z-[999] h-[80px]">
                <div className="flex items-center w-full py-1 gap-x-4">
                    {!isAuthenticated && (
                        <div className="flex items-center cursor-pointer">
                            <img src={logo} alt="logo" className="h-10" />
                            <Typography className="text-xl font-bold text-[#cc0000]">
                                TSICKER
                            </Typography>
                        </div>
                    )}

                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center">
                                <div className="flex items-center cursor-pointer w-[150px]">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="h-10"
                                    />
                                    <Typography className="text-xl font-bold text-[#cc0000]">
                                        TSICKER
                                    </Typography>
                                </div>
                                <Link to="/">
                                    <Button className="p-2 bg-[black] shadow-none hover:shadow-none text-white text-lg capitalize font-lg rounded-3xl select-none min-w-[60px]">
                                        Home
                                    </Button>
                                </Link>

                                <Link to="/create/">
                                    <Button
                                        className="p-2 bg-inherit shadow-none hover:shadow-none hover:bg-gray-300 text-[#111111] text-lg capitalize font-lg rounded-3xl min-w-[60px]"
                                        color="gray"
                                    >
                                        Create
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex items-center w-full">
                                <div className="relative mr-2 basis-11/12">
                                    {" "}
                                    <Input
                                        type="search"
                                        placeholder="Search"
                                        className="!border !border-gray-300 !bg-gray-200 text-gray-900 shadow-none ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-300 focus:!border-t-blue-300 focus:ring-blue-300/10 !rounded-3xl"
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                        containerProps={{
                                            className: "h-12 min-w-[400px]",
                                        }}
                                        ref={inputRef}
                                        onFocus={() => setIsSearch(true)}
                                    />
                                    <div
                                        className={
                                            isSearch
                                                ? "hidden"
                                                : "absolute flex items-center top-3 left-2 box-border"
                                        }
                                    >
                                        <FaSearch className="w-5 h-5 pr-1 text-gray-700" />
                                        <span className="text-gray-500">
                                            Search
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center basis-1/12">
                                    {" "}
                                    <div className="box-border flex items-center justify-center h-12 rounded-full cursor-pointer min-w-12 hover:bg-gray-300">
                                        <div className="relative">
                                            <BellIcon className="h-8 text-gray-700 " />
                                            <div className="bg-red-500 rounded-full flex justify-center items-center absolute h-[18px] min-w-[18px] pr-[3px] pl-[2px] -top-2 -right-2 ">
                                                <span className="text-white pl-[1px] pt-[1px] text-md">
                                                    10
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-border flex items-center justify-center h-12 rounded-full cursor-pointer min-w-12 hover:bg-gray-300">
                                        <div className="relative">
                                            <ChatBubbleLeftEllipsisIcon className="h-8 text-gray-700 " />
                                            <div className="bg-red-500 rounded-full flex justify-center items-center absolute h-[18px] min-w-[18px] pr-[3px] pl-[2px] -top-2 -right-2 ">
                                                <span className="text-white pl-[1px] pt-[1px] text-md"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-border flex items-center justify-center h-12 rounded-full cursor-pointer min-w-12 hover:bg-gray-300">
                                        <Avatar
                                            className="w-8 h-8"
                                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                                            alt="avatar"
                                        />
                                    </div>
                                    <ChevronDownIcon className="h-6 text-gray-700 rounded-full cursor-pointer hover:bg-gray-300" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <Link to="/explore/">
                            <Button
                                className="p-2 bg-inherit shadow-none hover:shadow-none hover:bg-gray-300 text-[#111111] text-lg capitalize font-lg rounded-3xl"
                                color="gray"
                            >
                                Explore
                            </Button>
                        </Link>
                    )}
                </div>
                {!isAuthenticated && (
                    <div className="flex items-center h-full gap-x-4">
                        {RIGHT_NAV_LIST.map((item, index) => (
                            <Button key={index} className={RIGHT_NAV_CLASSNAME}>
                                {item}
                            </Button>
                        ))}
                        <div className="flex items-center h-full gap-x-2">
                            <Button
                                className="button button--primary min-w-[100px]"
                                onClick={() => {
                                    setOpenLogin(true);
                                    setOpenSignUp(false);
                                    setFromNavBar(true);
                                }}
                            >
                                Log In
                            </Button>
                            <Button
                                className="button button--secondary min-w-[100px]"
                                onClick={() => {
                                    setOpenSignUp(true);
                                    setOpenLogin(false);
                                    setFromNavBar(true);
                                }}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            {!isAuthenticated ? (
                <>
                    <Login />
                    <Register />
                </>
            ) : null}
        </>
    );
}
