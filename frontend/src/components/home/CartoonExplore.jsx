import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import CARTOONIFY_SLIDE_INFO from "../../constants/cartoon";
export function CartoonExplore() {
    return (
        <>
            <div className="flex items-center justify-around w-full h-full bg-green-50">
                <div className="flex items-center justify-center w-2/5 h-full">
                    <div className="flex flex-col items-center justify-center gap-4 text-center h-1/2">
                        <Typography
                            variant="h1"
                            className="text-[60px] font-bold text-gray-700"
                        >
                            Cartoonify your image
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xl text-gray-500 break-words max-w-[400px] text-center"
                        >
                            Turn your photo into a cartoon with just one click.
                            Our AI-powered cartoonizer will transform your photo
                            into a cartoon in seconds.
                        </Typography>
                        <Button className="button button--primary !py-2">
                            Explore
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center w-3/5 ">
                    <div className="relative cursor-pointer">
                        {CARTOONIFY_SLIDE_INFO.slice(0, 5).map((slide, index) =>
                            index === 0 ? (
                                <Card
                                    key={index}
                                    shadow={false}
                                    className="relative grid w-[280px] lg:w-[360px] lg:h-[340px] items-end justify-center overflow-hidden text-center rounded-3xl z-20"
                                >
                                    <CardHeader
                                        floated={false}
                                        shadow={false}
                                        color="transparent"
                                        className="absolute inset-0 w-full h-full m-0 bg-center bg-cover rounded-none"
                                        style={{
                                            backgroundImage: `url(${slide.url})`,
                                        }}
                                    >
                                        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
                                    </CardHeader>
                                    <CardBody className="relative px-6 py-14 md:px-12">
                                        <Typography
                                            variant="h2"
                                            color="white"
                                            className="mb-10 font-medium leading-[1.5]"
                                        >
                                            {slide.name + " Style"}
                                        </Typography>
                                    </CardBody>
                                </Card>
                            ) : (
                                <div
                                    key={index}
                                    className={`absolute ${
                                        index % 2 === 0
                                            ? "top-0 -translate-y-1/2"
                                            : "bottom-0 translate-y-1/2 z-30"
                                    } ${
                                        index <= 2
                                            ? "left-0 -translate-x-2/3"
                                            : "right-0 translate-x-2/3"
                                    }`}
                                >
                                    {" "}
                                    <Card
                                        shadow={false}
                                        className="relative grid w-[260px] items-end justify-center overflow-hidden text-center rounded-3xl"
                                    >
                                        <CardHeader
                                            floated={false}
                                            shadow={false}
                                            color="transparent"
                                            className="absolute inset-0 w-full h-full m-0 bg-center bg-cover rounded-none"
                                            style={{
                                                backgroundImage: `url(${slide.url})`,
                                            }}
                                        >
                                            <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
                                        </CardHeader>
                                        <CardBody className="relative px-6 py-14 md:px-12">
                                            <Typography
                                                variant="h2"
                                                color="white"
                                                className=" font-medium leading-[1.5]"
                                            >
                                                {slide.name + " Style"}
                                            </Typography>
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
