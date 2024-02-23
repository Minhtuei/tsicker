import { useCallback, useEffect, useRef } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { CartoonExplore } from "../components/home/CartoonExplore";
import { PostExplore } from "../components/home/PostExplore";
import { PostGridGallery } from "../components/home/PostGridGallery";
import { SignUpExplore } from "../components/home/SignUpExplore";
import { SketchExplore } from "../components/home/SketchExplore";
import { SlideExplore } from "../components/home/SlideExplore";
import { useUserStore } from "../states/userInfoState";
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
    const { isAuthenticated } = useUserStore();
    return (
        <div className="relative w-screen h-screen overflow-x-hidden">
            <NavigationBar />
            {!isAuthenticated ? (
                <div className="h-full snap-mandatory snap-y overflow-y-auto scrollbar-hide">
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
            ) : (
                <div className="w-full h-full mt-[80px] mx-auto">
                    <PostGridGallery />
                </div>
            )}
        </div>
    );
}
