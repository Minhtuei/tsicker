import { useCallback, useRef } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { CartoonExplore } from "../components/home/CartoonExplore";
import { PostExplore } from "../components/home/PostExplore";
import { PostGridGallery } from "../components/home/PostGridGallery";
import { SignUpExplore } from "../components/home/SignUpExplore";
import { SketchExplore } from "../components/home/SketchExplore";
import { SlideExplore } from "../components/home/SlideExplore";
import usePreventMiddleClick from "../hooks/usePreventMiddleClick";
import { useUserStore } from "../states/userInfoState";
export function HomePage() {
    usePreventMiddleClick();
    const COMPONENTS = [
        SlideExplore,
        SketchExplore,
        CartoonExplore,
        PostExplore,
        SignUpExplore,
    ];

    const targetRef = useRef(null);

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
        <div className="relative w-full h-screen overflow-x-hidden">
            <NavigationBar />
            {!isAuthenticated ? (
                <div className="h-screen overflow-y-auto snap-mandatory snap-y scrollbar-hide">
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
                <div className="h-full mx-auto ">
                    <PostGridGallery />
                </div>
            )}
        </div>
    );
}
