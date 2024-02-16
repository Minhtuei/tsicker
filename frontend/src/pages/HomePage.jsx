import { useCallback, useEffect, useRef } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { CartoonExplore } from "../components/home/CartoonExplore";
import { PostExplore } from "../components/home/PostExplore";
import { SignUpExplore } from "../components/home/SignUpExplore";
import { SketchExplore } from "../components/home/SketchExplore";
import { SlideExplore } from "../components/home/SlideExplore";
export function HomePage() {
    const COMPONENTS = [
        SlideExplore,
        SketchExplore,
        CartoonExplore,
        PostExplore,
        SignUpExplore,
    ];
    const targetRef = useRef(null);

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
    const handleButtonClick = useCallback(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [targetRef]);
    return (
        <div className="relative w-screen h-screen">
            <NavigationBar />
            <div className="h-full snap-mandatory snap-y overflow-y-auto overflow-x-hidden scrollbar-hide">
                {COMPONENTS.map((Component, index) => (
                    <div
                        key={index}
                        ref={index === 1 ? targetRef : null}
                        className="h-full snap-center snap-always"
                    >
                        {index === 0 ? (
                            <Component
                                onButtonClick={() => handleButtonClick()}
                            />
                        ) : (
                            <Component />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
