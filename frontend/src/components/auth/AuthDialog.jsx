/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Dialog } from "@material-tailwind/react";
import { useAuthFormStore } from "../../states/authFormState";
import { AuthForm } from "./AuthForm";
import { useEffect } from "react";

export function AuthDialog({ type }) {
    const {
        openLogin,
        openSignUp,
        setOpenLogin,
        setOpenSignUp,
        setFromNavBar,
        fromNavBar,
    } = useAuthFormStore();

    useEffect(() => {
        if (fromNavBar && (openLogin || openSignUp)) {
            setFromNavBar(true);
        } else {
            setFromNavBar(false);
        }
    }, [openLogin, openSignUp, fromNavBar, setFromNavBar]);
    const handleDiaglog = () => {
        if (type === "login") {
            setOpenLogin(!openLogin);
        } else {
            setOpenSignUp(!openSignUp);
        }
    };

    return (
        <Dialog
            className="bg-transparent shadow-none"
            open={
                !fromNavBar ? false : type === "login" ? openLogin : openSignUp
            }
            handler={() => handleDiaglog()}
            size="sm"
        >
            <AuthForm type={type} />
        </Dialog>
    );
}
