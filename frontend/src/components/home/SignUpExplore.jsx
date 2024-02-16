import { Typography } from "@material-tailwind/react";
import { AuthForm } from "../auth/AuthForm";
import login_introduce from "../../assets/login_introduce.png";
import { useAuthFormStore } from "../../states/authFormState";
export function SignUpExplore() {
    const { openLogin, fromNavBar } = useAuthFormStore();
    return (
        <>
            <div
                className="flex items-center justify-around w-full h-full"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${login_introduce})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="flex justify-center items-center w-1/2 h-full">
                    <div className="flex flex-col items-center justify-center gap-4 text-center h-1/2">
                        <Typography
                            variant="h1"
                            className="text-[60px] font-bold text-white"
                        >
                            Sign up to get your ideas
                        </Typography>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="h-[50px]"></div>
                    {!fromNavBar && (
                        <div className="!w-[600px] ">
                            {openLogin ? (
                                <AuthForm type="login" />
                            ) : (
                                <AuthForm type="register" />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
