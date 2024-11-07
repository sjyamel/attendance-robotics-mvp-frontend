
"use client";
import useSWR from "swr";
import {useState} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
const fetcher = (url) => fetch(url).then((res) => res.json());

const staffPage = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5); // Number of rows per page


    const { data: staff, error: staffError } = useSWR(
        `https://attendance-robotics-mvp-backend.vercel.app/api/staff`,
        fetcher
    );
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = staff?.slice(indexOfFirstRow, indexOfLastRow);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            <div className="flex justify-between bg-white border-b-2 p-5">
                    <p className="flex justify-start items-center text-xl font-bold">
                        <FaChevronLeft className="mr-2" onClick={()=>router.push("/security")}/>
                        Staff
                        
                        </p>
                    
                </div>
            <div className="p-5 mt-10 bg-white rounded-md mx-10 shadow-lg">
                    
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border py-2 px-4">Name</th>
                            <th className="border py-2 px-4">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows?.map((s, index) => (
                            <tr key={index}>
                                <td className="border py-2 px-4">{s?.name}</td>
                                <td className="border py-2 px-4">{s?.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="m-2 flex justify-center items-center w-10 h-10 bg-gray-200 text-amber-500 rounded-full"
                    >
                        <FaChevronLeft/>
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(staff?.length ?? 0 / rowsPerPage)}
                        className="m-2 flex justify-center items-center w-10 h-10 bg-gray-200 text-amber-500 rounded-full"
                    >
                        <FaChevronRight/>
                    </button>
                </div>
                </div>
        </div>
    )
};


export default staffPage;