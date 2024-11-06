"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import Modal from "./components/Modal";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Main() {
    const router = useRouter();

    // Fetch attendance data using SWR
    const { data, error } = useSWR(
        "https://attendance-robotics-mvp-backend.vercel.app/api/attendance",
        fetcher
    );

    // Handle loading and error states
    if (error) return <div>Failed to load attendance data</div>;
    if (!data) return <div>Loading...</div>;

    // Get the last entry from the attendance data
    const lastEntry = data[data.length - 1];

    return (
        <>
            <button className="text-2xl m-2 font-bold" onClick={() => router.push("/security")}>
                &larr;
            </button>
            <div className="flex flex-col w-10/12 mx-auto gap-16 px-8 mt-20 font-inter">
                
                
                {/* Display last attendance entry */}
                {lastEntry && (
                    <div className="ml-4 flex flex-col gap-4 mt-8">
                        <h3 className="text-lg font-bold">Last Attendance Entry</h3>
                        <p><span className="font-bold">Name:</span> {lastEntry.name}</p>
                        <p><span className="font-bold">Date:</span> {new Date(lastEntry.date).toLocaleString()}</p>
                        <p><span className="font-bold">Status:</span> {lastEntry.status}</p>
                        {/* Add more fields as needed from the last entry */}
                    </div>
                )}
            </div>
        </>
    );
}

export default Main;
