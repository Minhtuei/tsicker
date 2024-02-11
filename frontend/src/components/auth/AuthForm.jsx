/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Button, Input, Typography } from "@material-tailwind/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuthFormStore } from "../../states/authFormState";
export function AuthForm({ type }) {
    const { setOpenLogin, setOpenSignUp } = useAuthFormStore();
    return (
        <div className="flex flex-col items-center">
            <img
                className="mb-2"
                src={logo}
                alt="logo"
                width={40}
                height={40}
            />
            <Typography className="text-4xl font-bold text-[#111111]">
                Welcome to Tsicker
            </Typography>

            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                    >
                        {type === "login" ? "Username or email" : "Username"}
                    </Typography>
                    <Input
                        size="lg"
                        placeholder={
                            type === "login" ? "name@mail.com" : "name"
                        }
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        autoComplete="username"
                    />
                    {type !== "login" && (
                        <>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="-mb-3"
                            >
                                Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                            />
                        </>
                    )}
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                    >
                        Password
                    </Typography>
                    <Input
                        type="password"
                        size="lg"
                        placeholder="********"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        autoComplete="password"
                    />
                    {type === "login" ? (
                        <>
                            <div className="-mt-3">
                                <Link
                                    className="hover:underline hover:underline-offset-1 text-gray-900 font-medium"
                                    to="/password/reset"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="-mb-3"
                            >
                                Confirm Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                                autoComplete="retype-password"
                            />
                        </>
                    )}
                </div>
                <Button
                    className="mt-6 bg-[#E60023] rounded-full hover:shadow-none py-4"
                    fullWidth
                >
                    {type === "login" ? "Log In" : "Continue"}
                </Button>
                <Typography color="gray" className="mt-2 text-center font-bold">
                    OR
                </Typography>
                <Button
                    className="mt-2 bg-blue-500 flex items-center gap-x-16 font-bold rounded-full hover:shadow-none"
                    fullWidth
                >
                    <div className="w-7 h-7">
                        <FaFacebook className="w-full h-full" />
                    </div>
                    Continue with Facebook
                </Button>
                <Button
                    className="mt-2 bg-inherit flex items-center gap-x-16 font-bold rounded-full text-[#111111] hover:shadow-none"
                    fullWidth
                    variant="outlined"
                >
                    <div className="w-7 h-7">
                        <FcGoogle className="w-full h-full" />
                    </div>
                    Continue with Google
                </Button>
                <Typography
                    color="gray"
                    className="mt-4 text-center text-sm font-normal"
                >
                    By continuing, you agree to Tsicker's Terms of Service and
                    acknowledge you've read our Privacy Policy. Notice at
                    collection.
                </Typography>
                <Typography
                    color="gray"
                    className="mt-4 text-center font-bold text-gray-900 cursor-pointer text-sm hover:underline hover:underline-offset-1"
                    onClick={
                        type === "login"
                            ? () => {
                                  setOpenSignUp(true);
                                  setOpenLogin(false);
                              }
                            : () => {
                                  setOpenLogin(true);
                                  setOpenSignUp(false);
                              }
                    }
                >
                    {type === "login"
                        ? "Not on Tsicker yet? Sign Up"
                        : "Already have an account? Log In"}
                </Typography>
            </form>
        </div>
    );
}
