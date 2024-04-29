import {
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Button,
    Avatar,
    Typography,
} from "@material-tailwind/react";
import { GrUpload } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentBox } from "../components/CommentBox";
import usePost from "../hooks/usePost";
import { AppSkeleton } from "../components/AppSkeleton";
export function DetailPostPage() {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);
    const { postId } = useParams();
    const post = usePost(postId);
    useEffect(() => {
        console.log(maxHeight);
    }, [maxHeight]);
    if (!post) return <AppSkeleton />;
    return (
        <div className="flex items-center justify-center w-screen h-screen ">
            <Card className="w-full max-w-[64rem] flex-row rounded-2xl shadow-xl">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="w-1/2 m-0 rounded-r-none rounded-l-2xl shrink-0"
                >
                    <img
                        src={post?.image[0].url}
                        alt="card-image"
                        className="object-cover object-center w-full"
                        onLoad={(event) =>
                            setMaxHeight(event.target.offsetHeight)
                        }
                    />
                </CardHeader>
                <div className="flex flex-col w-full h-full rounded-tr-2xl">
                    <CardBody
                        className="flex flex-col flex-1 p-0 pl-8"
                        style={{
                            maxHeight: `${maxHeight}px`,
                        }}
                    >
                        <div className="sticky z-20 flex items-center justify-between w-full pt-8 pr-8 bg-white top-16">
                            <div className="flex items-center gap-x-1">
                                <IconButton
                                    size="lg"
                                    className="rounded-full shadow-none hover:bg-gray-200 hover:shadow-none"
                                    color="white"
                                >
                                    <GrUpload className="w-8 h-8" />
                                </IconButton>
                                <IconButton
                                    size="lg"
                                    className="rounded-full shadow-none hover:bg-gray-200 hover:shadow-none"
                                    color="white"
                                >
                                    <FiMoreHorizontal className="w-8 h-8" />
                                </IconButton>
                            </div>
                            <Button className="px-4 py-3 shadow-none rounded-full hover:shadow-none text-md capitalize transition-all duration-300 min-w-[50px] bg-red-500 hover:bg-red-700">
                                Save
                            </Button>
                        </div>
                        <CardHeader
                            color="transparent"
                            floated={false}
                            shadow={false}
                            className="flex flex-col h-[calc(100vh-103px-80px-58px)] py-8 pr-8 mx-0"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-x-1">
                                    <Avatar
                                        size="lg"
                                        variant="circular"
                                        src={
                                            post?.user.avatar ||
                                            "https://i.pravatar.cc/300"
                                        }
                                        alt="tania andrew"
                                    />
                                    <div className="flex w-full flex-col gap-0.5 max-w-2/5">
                                        <Typography
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {post?.user.username}
                                        </Typography>

                                        <Typography
                                            color="blue-gray"
                                            className="text-sm"
                                        >
                                            {post?.user.totalSubscriber}{" "}
                                            Subscribers
                                        </Typography>
                                    </div>
                                </div>
                                <Button className="button--secondary !shadow-none rounded-3xl ">
                                    Follow
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <Typography
                                    color="blue-gray"
                                    className="text-md"
                                >
                                    Comment
                                </Typography>
                                {!isCommentOpen ? (
                                    <ChevronUpIcon
                                        onClick={() => setIsCommentOpen(true)}
                                        className="w-8 h-8 font-bold text-black rounded-full cursor-pointer hover:bg-blue-gray-100"
                                    />
                                ) : (
                                    <ChevronDownIcon
                                        onClick={() => setIsCommentOpen(false)}
                                        className="w-8 h-8 font-bold text-black rounded-full cursor-pointer hover:bg-blue-gray-100"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col w-full max-h-[800px] overflow-y-auto gap-2.5 mt-2.5">
                                {isCommentOpen &&
                                    post?.comment.map((comment, index) => (
                                        <div
                                            className="flex pb-2 gap-x-2"
                                            key={index}
                                        >
                                            <Avatar
                                                size="sm"
                                                src={comment.avatar}
                                                alt="avatar"
                                            />
                                            <div className="flex flex-col justify-center">
                                                <Typography
                                                    color="blue-gray"
                                                    className="leading-5 whitespace-pre-wrap "
                                                    style={{
                                                        overflowWrap:
                                                            "break-word",
                                                    }}
                                                >
                                                    <span className="font-bold">
                                                        {comment.name}
                                                    </span>{" "}
                                                    {comment.comment}
                                                </Typography>

                                                <div className="flex items-center">
                                                    <Typography
                                                        color="blue-gray"
                                                        className="text-sm"
                                                    >
                                                        {comment.date}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardHeader>
                        <div className="sticky bottom-0 z-10 flex flex-col w-[calc(100%+32px)] px-8 py-2 -ml-8 bg-white border-t-2 rounded-br-2xl">
                            <div className="flex items-center justify-between">
                                <Typography
                                    color="blue-gray"
                                    className="text-lg"
                                >
                                    {post?.comment.length ?? 0} Comments
                                </Typography>
                            </div>
                            <div className="flex items-center gap-2">
                                <Avatar
                                    size="md"
                                    src="https://i.pravatar.cc/300"
                                    alt="avatar"
                                />
                                <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
                                    <div className="relative grid h-full w-full min-w-[200px]">
                                        <textarea
                                            disabled={
                                                post?.commentsEnabled
                                                    ? false
                                                    : true
                                            }
                                            rows="1"
                                            placeholder="Your Message"
                                            className="peer h-full  min-h-full w-full resize-y rounded-[7px]  !border-0 border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                        ></textarea>
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                    </div>
                                    <CommentBox />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </div>
            </Card>
        </div>
    );
}
