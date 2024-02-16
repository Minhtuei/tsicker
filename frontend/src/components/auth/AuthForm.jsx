/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    Card,
    CardBody,
    Input,
    Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import * as yup from "yup";
import logo from "../../assets/logo.png";
import { useAuthFormStore } from "../../states/authFormState";
import { authService } from "../../services/authService";
export function AuthForm({ type }) {
    const { setOpenLogin, setOpenSignUp } = useAuthFormStore();
    const commonValidation = {
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required").min(8),
    };

    const validateSchema =
        type !== "login"
            ? yup.object().shape({
                  ...commonValidation,
                  email: yup
                      .string()
                      .email("This email is not valid")
                      .required("Email is required"),
                  confirmPassword: yup
                      .string()
                      .oneOf(
                          [yup.ref("password"), null],
                          "Passwords must match"
                      )
                      .required("Please confirm your password"),
              })
            : yup.object().shape(commonValidation);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateSchema),
    });
    const submit = async (loginFormData) => {
        try {
            if (type === "login") {
                const response = await authService.login(loginFormData);
                console.log(response);
            } else {
                const response = await authService.register(loginFormData);
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Card className="mx-auto w-[80%] max-w-[80%] rounded-3xl">
            <CardBody className="flex flex-col gap-4 justify-center items-center">
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

                <form
                    className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={handleSubmit(submit)}
                >
                    <div className="mb-1 flex flex-col gap-4">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            {type === "login"
                                ? "Username or email"
                                : "Username"}
                        </Typography>
                        <Input
                            size="lg"
                            placeholder={
                                type === "login" ? "name@mail.com" : "name"
                            }
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                            autoComplete="username"
                            {...register("username", { required: true })}
                        />
                        {errors.username?.message && (
                            <Typography
                                color="red"
                                variant="small"
                                className="-mt-3 -mb-4"
                            >
                                {errors.username?.message}{" "}
                            </Typography>
                        )}
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
                                    autoComplete="email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email?.message && (
                                    <Typography
                                        color="red"
                                        variant="small"
                                        className="-mt-3 -mb-4"
                                    >
                                        {errors.email?.message}{" "}
                                    </Typography>
                                )}
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
                                className:
                                    "before:content-none after:content-none",
                            }}
                            autoComplete="password"
                            {...register("password", {
                                minLength: 8,
                                required: true,
                            })}
                        />
                        {errors.password?.message && (
                            <Typography
                                color="red"
                                variant="small"
                                className="-mt-3 -mb-4"
                            >
                                {errors.password?.message}{" "}
                            </Typography>
                        )}

                        {type === "login" ? (
                            <>
                                <div className="-mt-2 text-right">
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
                                    {...register("confirmPassword", {
                                        minLength: 8,
                                        required: true,
                                    })}
                                />
                                {errors.confirmPassword?.message && (
                                    <Typography
                                        color="red"
                                        variant="small"
                                        className="-mt-3 -mb-4"
                                    >
                                        {errors.confirmPassword?.message}{" "}
                                    </Typography>
                                )}
                            </>
                        )}
                    </div>
                    <Button
                        className="mt-6 bg-[#E60023] rounded-full hover:shadow-none px-2 text-xs"
                        fullWidth
                        type="submit"
                    >
                        {type === "login" ? "Log In" : "Continue"}
                    </Button>
                    <Typography
                        color="gray"
                        className="mt-2 text-center font-bold"
                    >
                        OR
                    </Typography>
                    <Button
                        className="mt-2 bg-blue-500 flex items-center gap-x-12 font-bold rounded-full hover:shadow-none px-3 py-1.5 text-md"
                        fullWidth
                    >
                        <div className="w-7 h-7">
                            <FaFacebook className="w-full h-full" />
                        </div>
                        Continue with Facebook
                    </Button>
                    <Button
                        className="mt-2 bg-inherit flex items-center gap-x-16 font-bold rounded-full text-[#111111] hover:shadow-none px-3 py-1.5 text-sm"
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
                        By continuing, you agree to Tsicker's Terms of Service
                        and acknowledge you've read our Privacy Policy. Notice
                        at collection.
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
            </CardBody>
        </Card>
    );
}
