"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import Modal from "./components/Modal";
import { FaChevronLeft } from "react-icons/fa";

// Helper function for fetching data
const fetcher = (url) => fetch(url).then((res) => res.json());

function Main() {
    const router = useRouter();

    // Fetch attendance data using SWR
    const { data: attendanceData, error: attendanceError } = useSWR(
        "https://attendance-robotics-mvp-backend.vercel.app/api/attendance",
        fetcher,
        { refreshInterval: 300 }
    );

    // Get the last entry from the attendance data
    const lastEntry = attendanceData ? attendanceData[attendanceData.length - 1] : null;

    // Fetch staff data if `lastEntry` is available
    const { data: staffData, error: staffError } = useSWR(
        lastEntry ? `https://attendance-robotics-mvp-backend.vercel.app/api/staff/${lastEntry.staffID}` : null,
        fetcher
    );

    // Loading and error states
    if (attendanceError || staffError) return <div className="text-center text-red-500 mt-4">Failed to load data</div>;
    if (!attendanceData) return <div className="text-center mt-4">Loading...</div>;

    return (
        <>
            <button
                className="text-2xl mt-4 m-2 font-bold text-black"
                onClick={() => router.push("/security")}
            >
               <FaChevronLeft/>
            </button>
            <div className="flex flex-col w-full mx-auto gap-16 px-8 mt-12 font-inter">
                
                {/* Last Attendance Entry */}
                {lastEntry && (
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center gap-4 mt-8 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-700">Last Attendance Entry</h3>
                        
                        {/* Display staff picture */}
                        {staffData?.picture && (
                            <img
                                src={staffData.picture}
                                alt="Staff profile"
                                className="w-24 h-24 rounded-full border border-gray-300"
                            />
                        )}

                        <div className="text-lg text-gray-600">
                            <p>
                                <span className="font-semibold">Name:</span> {staffData?.name || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Date:</span> {new Date(lastEntry.date).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold">Role:</span> {staffData?.role || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Department:</span> {staffData?.department || "N/A"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Main;
