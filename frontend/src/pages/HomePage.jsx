import { useCallback, useEffect, useRef, useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { CartoonExplore } from "../components/home/CartoonExplore";
import { PostExplore } from "../components/home/PostExplore";
import { SignUpExplore } from "../components/home/SignUpExplore";
import { SketchExplore } from "../components/home/SketchExplore";
import { SlideExplore } from "../components/home/SlideExplore";
import { authService } from "../services/authService";
import { useUserStore } from "../states/userInfoState";
import { PostGridGallery } from "../components/home/PostGridGallery";
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
    const { setUserInfo, setIsAuthenticated, isAuthenticated } = useUserStore();
    const [delayedRendering, setDelayedRendering] = useState(false);

    useEffect(() => {
        const fetchDataAndDelay = async () => {
            try {
                const response = await authService.verify();
                if (response.success) {
                    setUserInfo(response.user);
                    setIsAuthenticated(true);
                    // Introduce a delay after fetching
                }
                setTimeout(() => {
                    setDelayedRendering(true);
                }, 500); // Adjust the delay time as needed
            } catch (error) {
                // Handle error
                console.error("Error fetching data:", error);
            }
        };

        fetchDataAndDelay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!delayedRendering) return null;
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
