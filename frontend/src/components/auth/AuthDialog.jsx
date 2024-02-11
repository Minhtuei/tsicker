/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Dialog, DialogBody } from "@material-tailwind/react";
import { AuthForm } from "./AuthForm";
import { useAuthFormStore } from "../../states/authFormState";
export function AuthDialog({ type }) {
    const { openLogin, openSignUp, setOpenLogin, setOpenSignUp } =
        useAuthFormStore();

    return (
        <Dialog
            className="px-2.5 pt-5 pb-6 rounded-xl m-0"
            open={type === "login" ? openLogin : openSignUp}
            handler={
                type === "login"
                    ? () => setOpenLogin(!openLogin)
                    : () => setOpenSignUp(!openSignUp)
            }
            size="sm"
        >
            <DialogBody className="p-0 w-full">
                <AuthForm type={type} />
            </DialogBody>
        </Dialog>
    );
}
