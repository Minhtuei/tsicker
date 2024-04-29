export function AppSkeleton() {
    return (
        <div
            role="status"
            className="fixed w-5/6 p-4 transform -translate-x-1/2 -translate-y-1/2 border border-gray-200 rounded shadow top-1/2 left-1/2 animate-pulse md:p-6 dark:border-gray-700"
        >
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="w-full h-3 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-baseline mt-4 space-x-6">
                <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div className="w-full h-48 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-96 dark:bg-gray-700"></div>
                <div className="w-full h-48 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-60 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                <div className="w-full h-48 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-96 dark:bg-gray-700"></div>
                <div className="w-full h-48 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-60 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
