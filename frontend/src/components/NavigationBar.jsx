import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import logo from "../assets/logo.png";
import { useAuthFormStore } from "../states/authFormState";
import { useUserStore } from "../states/userInfoState";
export function NavigationBar() {
    const RIGHT_NAV_LIST = ["About", "Business", "Blog"];
    const RIGHT_NAV_CLASSNAME =
        "p-2 bg-inherit shadow-none rounded-xl hover:shadow-none hover:underline underline-offset-1 hover:underline-offset-1 text-[#111111] text-lg capitalize ";
    const AUTH_BUTTON_CLASSNAME =
        "px-3 py-2 shadow-none rounded-full hover:shadow-none text-lg capitalize transition-all duration-300";
    const { setOpenLogin, setOpenSignUp, setFromNavBar } = useAuthFormStore();
    const { authLoading } = useUserStore();
    return (
        <>
            <div className="flex justify-between items-center p-4 fixed top-0 bg-white w-screen z-[999]">
                <div className="flex items-center gap-x-4">
                    <div className="flex items-center cursor-pointer">
                        <img src={logo} alt="logo" className="h-10" />
                        <Typography className="text-xl font-bold text-[#cc0000]">
                            TSICKER
                        </Typography>
                    </div>

                    {!authLoading ? (
                        <>
                            <Link to="/">
                                <Button className="p-2 bg-[black] shadow-none hover:shadow-none text-white text-lg capitalize font-lg rounded-3xl select-none">
                                    Home
                                </Button>
                            </Link>

                            <Link to="/create/">
                                <Button
                                    className="p-2 bg-inherit shadow-none hover:shadow-none hover:bg-gray-300 text-[#111111] text-lg capitalize font-lg rounded-3xl"
                                    color="gray"
                                >
                                    Create
                                </Button>
                            </Link>
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
                <div className="flex items-center gap-x-4">
                    {RIGHT_NAV_LIST.map((item, index) => (
                        <Button key={index} className={RIGHT_NAV_CLASSNAME}>
                            {item}
                        </Button>
                    ))}
                    <div className="flex items-center gap-x-2">
                        <Button
                            className={
                                AUTH_BUTTON_CLASSNAME +
                                " bg-[#E60023] hover:bg-red-800  hover:text-gray-200 text-white"
                            }
                            onClick={() => {
                                setOpenLogin(true);
                                setOpenSignUp(false);
                                setFromNavBar(true);
                            }}
                        >
                            Log In
                        </Button>
                        <Button
                            className={
                                AUTH_BUTTON_CLASSNAME +
                                " bg-gray-300 hover:bg-gray-500 text-[#111111]"
                            }
                            color="gray"
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
            </div>
            <Login />
            <Register />
        </>
    );
}
