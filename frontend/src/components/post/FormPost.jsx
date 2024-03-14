import {
    Input,
    Textarea,
    Typography,
    Select,
    Option,
    Switch,
} from "@material-tailwind/react";
export function FormPost() {
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
                />
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
                />
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
                />
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
                />
            </div>
            <div className="flex flex-col">
                <Typography className="text-lg font-semibold" size="xl">
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
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                </Select>
            </div>
            <div className="flex flex-col gap-y-2">
                <Switch
                    type="switch"
                    label="Allow People to Comment"
                    defaultChecked={true}
                    labelProps={{
                        className: "font-semibold text-lg text-gray-900",
                    }}
                />
                <Switch
                    type="switch"
                    label="Commercial Use"
                    defaultChecked={false}
                    labelProps={{
                        className: "font-semibold text-lg text-gray-900",
                    }}
                />
            </div>
        </>
    );
}
