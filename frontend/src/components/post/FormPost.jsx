/* eslint-disable react/prop-types */
import {
    Input,
    Textarea,
    Typography,
    Select,
    Option,
    Switch,
} from "@material-tailwind/react";
import { Controller } from "react-hook-form";
// eslint-disable-next-line react/prop-types
export function FormPost({ register, errors, control }) {
    const COLLETIONS = [
        "Favorite",
        "Trending",
        "Tasks",
        "Projects",
        "Work",
        "Personal",
        "Others",
    ];
    return (
        <>
            <div className="flex flex-col">
                <Typography className="text-lg font-semibold" size="xl">
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
                    {...register("title")}
                />
                {errors.title && (
                    <Typography
                        className="text-sm text-red-500"
                        size="sm"
                        color="red"
                    >
                        {errors.title.message}
                    </Typography>
                )}
            </div>

            <div className="flex flex-col mb-8">
                <Typography className="text-lg font-semibold" size="xl">
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
                        className: "h-12 min-w-full mb-8",
                    }}
                    {...register("description")}
                />
                {errors.description && (
                    <Typography
                        className="text-sm text-red-500"
                        size="sm"
                        color="red"
                    >
                        {errors.description.message}
                    </Typography>
                )}
            </div>
            <div className="flex flex-col">
                <Typography className="text-lg font-semibold" size="xl">
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
                    {...register("link")}
                />
                {errors.link && (
                    <Typography
                        className="text-sm text-red-500"
                        size="sm"
                        color="red"
                    >
                        {errors.link.message}
                    </Typography>
                )}
            </div>
            <div className="flex flex-col">
                <Typography className="text-lg font-semibold" size="xl">
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
                    {...register("tags")}
                />
                {errors.tags && (
                    <Typography
                        className="text-sm text-red-500"
                        size="sm"
                        color="red"
                    >
                        {errors.tags.message}
                    </Typography>
                )}
            </div>
            <div className="flex flex-col">
                <Typography className="text-lg font-semibold" size="xl">
                    Your Collection
                </Typography>
                <Controller
                    name="collection"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            placeholder="Select a collection"
                            className="!border !border-gray-300 !bg-gray-inherit text-gray-900 shadow-none ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-300 focus:!border-t-blue-300 focus:ring-blue-300/10 !rounded-xl"
                            labelProps={{ className: "hidden" }}
                            containerProps={{ className: "h-12 min-w-full" }}
                            {...field}
                        >
                            {COLLETIONS.map((collection) => (
                                <Option key={collection} value={collection}>
                                    {collection}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
            </div>
            <div className="flex flex-col gap-y-2">
                <Switch
                    type="switch"
                    label="Allow People to Comment"
                    defaultChecked={true}
                    labelProps={{
                        className: "font-semibold text-lg text-gray-900",
                    }}
                    {...register("allowComment")}
                />
                <Switch
                    type="switch"
                    label="Commercial Use"
                    defaultChecked={false}
                    labelProps={{
                        className: "font-semibold text-lg text-gray-900",
                    }}
                    {...register("commercialUse")}
                />
            </div>
        </>
    );
}
