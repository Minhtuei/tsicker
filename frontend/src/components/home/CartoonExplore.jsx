import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

import mn_Hayao from "../../assets/mn_Hayao.jpg";
import mn_Hosoda from "../../assets/mn_Hosoda.jpg";
import mn_Paprika from "../../assets/mn_Paprika.jpg";
import mn_Shinkai from "../../assets/mn_Shinkai.jpg";
import mn_oilPaint from "../../assets/mn_oilPaint.jpg";

const CARTOONIFY_SLIDE_INFO = [
    { name: "Oil Paint", url: mn_oilPaint },
    { name: "Hosoda", url: mn_Hosoda },
    { name: "Paprika", url: mn_Paprika },
    { name: "Hayao", url: mn_Hayao },
    { name: "Shinkai", url: mn_Shinkai },
];

export function CartoonExplore() {
    return (
        <>
            <div className="flex items-center justify-around w-full h-full bg-green-50">
                <div className="flex justify-center items-center w-2/5 h-full">
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
                        <Button
                            className={
                                "px-3 py-2 shadow-none rounded-full hover:shadow-none text-lg capitalize transition-all duration-300 bg-[#E60023] hover:bg-red-800  hover:text-gray-200 text-white"
                            }
                        >
                            Explore
                        </Button>
                    </div>
                </div>
                <div className="w-3/5 flex items-center justify-center ">
                    <div className="relative cursor-pointer">
                        {CARTOONIFY_SLIDE_INFO.map((slide, index) =>
                            index === 0 ? (
                                <Card
                                    key={index}
                                    shadow={false}
                                    className="relative grid h-[360px] w-[340px] items-end justify-center overflow-hidden text-center rounded-3xl z-20"
                                >
                                    <CardHeader
                                        floated={false}
                                        shadow={false}
                                        color="transparent"
                                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${slide.url})`,
                                        }}
                                    >
                                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                                    </CardHeader>
                                    <CardBody className="relative py-14 px-6 md:px-12">
                                        <Typography
                                            variant="h2"
                                            color="white"
                                            className="mb-6 font-medium leading-[1.5]"
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
                                            ? "-top-[200px]"
                                            : "-bottom-[200px]"
                                    } ${
                                        index <= 2
                                            ? "-left-[200px]"
                                            : "-right-[200px]"
                                    }`}
                                >
                                    {" "}
                                    <Card
                                        shadow={false}
                                        className="relative grid h-[320px] w-[300px] items-end justify-center overflow-hidden text-center rounded-3xl"
                                    >
                                        <CardHeader
                                            floated={false}
                                            shadow={false}
                                            color="transparent"
                                            className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${slide.url})`,
                                            }}
                                        >
                                            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                                        </CardHeader>
                                        <CardBody className="relative py-14 px-6 md:px-12">
                                            <Typography
                                                variant="h2"
                                                color="white"
                                                className="mb-6 font-medium leading-[1.5]"
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
