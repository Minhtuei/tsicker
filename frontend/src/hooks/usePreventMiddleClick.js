import { useEffect } from "react";

function usePreventMiddleClick() {
    useEffect(() => {
        const handleMouseDown = (event) => {
            if (event.button === 1) {
                event.preventDefault();
            }
        };
        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);
}

export default usePreventMiddleClick;
