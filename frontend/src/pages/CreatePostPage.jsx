import { NavigationBar } from "../components/NavigationBar";
import {
    Input,
    Textarea,
    Typography,
    Button,
    Select,
    Option,
} from "@material-tailwind/react";
export function CreatePostPage() {
    return (
        <div className="h-screen overflow-hidden">
            <NavigationBar />
            <div className="mt-[80px] h-full flex">
                <div className="bg-gray-100 h-full basis-1/6"></div>
                <div className="basis-5/6 h-full">
                    <div className="h-[80px] px-4 flex items-center justify-between border border-t-gray-300 border-b-gray-300">
                        <Typography className="font-semibold text-lg" size="xl">
                            Create a Post
                        </Typography>
                        <Button className="px-3 py-3 shadow-none rounded-full hover:shadow-none text-md capitalize transition-all duration-300 min-w-[50px] bg-red-500 hover:bg-red-700">
                            Create Post
                        </Button>
                    </div>
                    <div className="flex-1 h-[calc(100%-80px)] relative">
                        <div className="h-full flex flex-col absolute left-1/2 -translate-x-1/2 box-border pt-4">
                            <div className="flex flex-1">
                                <div className="h-full basis-2/5 px-4">
                                    <div className="bg-gray-300 min-w-[375px] h-full rounded-3xl"></div>
                                </div>
                                <div className="w-full h-full flex flex-col gap-4 basis-3/5 px-4 gap-y-6">
                                    <div className="flex flex-col">
                                        <Typography
                                            className="font-semibold text-lg"
                                            size="xl"
                                        >
                                            Your Title
                                        </Typography>
                                        <Input
                                            type="title"
                                            placeholder="Add a title"
                                            className="!border !border-gray-300 !bg-gray-inherit text-gray-900 shadow-none ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-300 focus:!border-t-blue-300 focus:ring-blue-300/10 !rounded-xl"
                                            labelProps={{
                                                className: "hidden",
                                            }}
                                            containerProps={{
                                                className: "h-12 min-w-[600px]",
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-8">
                                        <Typography
                                            className="font-semibold text-lg"
                                            size="xl"
                                        >
                                            Your Description
                                        </Typography>
                                        <Textarea
                                            type="description"
                                            placeholder="Add a description"
                                            className="!border !border-gray-300 !bg-gray-inherit text-gray-900 shadow-none ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-300 focus:!border-t-blue-300 focus:ring-blue-300/10 !rounded-xl"
                                            labelProps={{
                                                className: "hidden",
                                            }}
                                            containerProps={{
                                                className:
                                                    "h-12 min-w-full mb-8",
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography
                                            className="font-semibold text-lg"
                                            size="xl"
                                        >
                                            Your Link (Optional)
                                        </Typography>
                                        <Input
                                            type="link"
                                            placeholder="Add a link"
                                            className="!border !border-gray-300 !bg-gray-inherit text-gray-900 shadow-none ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-300 focus:!border-t-blue-300 focus:ring-blue-300/10 !rounded-xl"
                                            labelProps={{
                                                className: "hidden",
                                            }}
                                            containerProps={{
                                                className: "h-12 min-w-full",
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography
                                            className="font-semibold text-lg"
                                            size="xl"
                                        >
                                            Your Tags (Optional)
                                        </Typography>
                                        <Input
                                            type="tags"
                                            placeholder="Add tags"
                                            className="!border !border-gray-300 !bg-gray-inherit text-gray-900 shadow-none ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-300 focus:!border-t-blue-300 focus:ring-blue-300/10 !rounded-xl"
                                            labelProps={{
                                                className: "hidden",
                                            }}
                                            containerProps={{
                                                className: "h-12 min-w-full",
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Typography
                                            className="font-semibold text-lg"
                                            size="xl"
                                        >
                                            Your Collection
                                        </Typography>
                                        <Select
                                            type="collection"
                                            placeholder="Select a collection"
                                            className="!border !border-gray-300 !bg-gray-inherit text-gray-900 shadow-none ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-300 focus:!border-t-blue-300 focus:ring-blue-300/10 !rounded-xl"
                                            labelProps={{
                                                className: "hidden",
                                            }}
                                            containerProps={{
                                                className: "h-12 min-w-full",
                                            }}
                                        >
                                            <Option>
                                                Material Tailwind HTML
                                            </Option>
                                            <Option>
                                                Material Tailwind React
                                            </Option>
                                            <Option>
                                                Material Tailwind Vue
                                            </Option>
                                            <Option>
                                                Material Tailwind Angular
                                            </Option>
                                            <Option>
                                                Material Tailwind Svelte
                                            </Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[200px] shrink-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
