"use client";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";
import UploadToCloudinary from "../../../utils/UploadToCloudinary";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronRight, FaPlus, FaChevronLeft } from "react-icons/fa";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SecurityPage = () => {
    const router = useRouter();
    const [tooltip, setTooltip] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [settingModal, setSettingModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFabOpen, setIsFabOpen] = useState(false);
    const [fetchedAttendance, setFetchedAttendance] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [rowsPerPage] = useState(5); // Number of rows per page
    const [staffData, setStaffData] = useState({
        name: "",
        staffID: "",
        department: "",
        picture: "",
        role: "",
    });
    const handleFetchAttendance = async () => {
        try {
            const response = await axios.get(
                "https://attendance-robotics-mvp-backend.vercel.app/api/attendance"
            );
            setFetchedAttendance(response.data);
            setFilteredAttendance(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
        handleFetchAttendance();
    }, []);
    const [file, setFile] = useState(null);
    let { data: attendanceData, error: attendanceError } = useSWR(
        "https://attendance-robotics-mvp-backend.vercel.app/api/attendance",
        fetcher,
        { refreshInterval: 300 }
    );
    const { data: staff, error: staffError } = useSWR(
        `https://attendance-robotics-mvp-backend.vercel.app/api/staff/`,
        fetcher
    );
    if (attendanceError) return <div>Error loading data</div>;
    if (!attendanceData) return <div>Loading...</div>;

    // Calculate the current rows to display based on pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredAttendance.slice(indexOfFirstRow, indexOfLastRow);
    
    

    // Function to change the page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const toggleTooltip = () => setTooltip((prev) => !prev);
    const handleSearch = (e) =>{
        setFilteredAttendance(fetchedAttendance.filter((attendance) => attendance.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }
    const handleFilterByDate = (e) => {
        const selectedDate = e.target.value;
        console.log(selectedDate);
        const attendance = fetchedAttendance;
        // console.log(String(selectedDate));
        
        setFilteredAttendance(fetchedAttendance.filter((attendance) => {
            
            // console.log(attendance.date);
            return attendance.date.split("T")[0] === selectedDate.split("T")[0];
        }
        )
        );
    }
    // Handle adding staff
    const handleAddStaff = async () => {
        try {
            setLoading(true);
            let pictureUrl = "";

            // Upload the picture to Cloudinary if a file is selected
            if (file) {
                pictureUrl = await UploadToCloudinary(file);
                console.log("Picture URL:", pictureUrl);
            }

            // Update staffData with the picture URL before sending
            const updatedStaffData = { ...staffData, picture: pictureUrl };

            // Send updated staff data to the backend
            await axios.post("https://attendance-robotics-mvp-backend.vercel.app/api/staff", updatedStaffData);

            // Close modal and reset staff data
            setModalIsOpen(false);
            setIsFabOpen(false);
            setStaffData({
                name: "",
                staffID: "",
                department: "",
                picture: "",
                role: "",
            });
            setFile(null);
            setLoading(false);
        } catch (error) {
            console.error("Error adding staff:", error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaffData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const toggleSettingsModal = () => setSettingModal((prev) => !prev);
    const toggleModal = () => setModalIsOpen((prev) => !prev);
    const toggleFab = () => { setIsFabOpen((prev) => !prev); setModalIsOpen((prev) => !prev); };


    return (
        <>
            <div>
                <div className="flex justify-between bg-white border-b-2 p-5">
                    <p className="text-xl font-bold">Dashboard</p>
                    <BsThreeDotsVertical onClick={toggleTooltip} />
                </div>
                <div className="lg:flex lg:justify-between p-5 gap-5">
                    <div className="flex-1 w-full rounded-md shadow-lg mb-5 bg-white h-40 px-3 py-8 font-inter text-center">
                        <h3 className="text-3xl font-bold">{attendanceData.length ?? 0}</h3>
                        <p className="font-bold text-zinc-600 text-xl mt-4">Total People that came in</p>
                    </div>
                    
                    <div className="flex-1 w-full rounded-md shadow-lg bg-white h-40 px-3 py-8 font-inter text-center">
                        <h3 className="text-3xl font-bold">{staff?.length ?? 0}</h3>
                        <p className="font-bold text-zinc-600 text-xl mt-4">Total Staff</p>
                    </div>
                </div>

                {/* Attendance Table with Pagination */}
                <div className="p-5 mt-10 bg-white rounded-md mx-10 shadow-lg">
                    <div className="flex">
                    <input type="search" className="w-full m-2 px-4 py-2 border-2 rounded-md" onChange={handleSearch} placeholder="Search by name" />
                    <input type="date" className="w-[20%] m-2 px-4 py-2 border-2 rounded-md" onChange={handleFilterByDate} />
                    </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border py-2 px-4">Name</th>
                            <th className="border py-2 px-4">Date/time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows?.map((attendance, index) => (
                            <tr key={index}>
                                <td className="border py-2 px-4">{attendance?.name}</td>
                                <td className="border py-2 px-4">{attendance?.date.split("T")[0]} {attendance.date.split("T")[1].substring(0, 5)}</td>
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
                        disabled={currentPage === Math.ceil(attendanceData.length / rowsPerPage)}
                        className="m-2 flex justify-center items-center w-10 h-10 bg-gray-200 text-amber-500 rounded-full"
                    >
                        <FaChevronRight/>
                    </button>
                </div>
                </div>

                {/* Pagination Controls */}
                
            </div>

            {/* Modals and Floating Action Button */}
            {/* Add Staff Modal */}
            <Modal
                isOpen={modalIsOpen}
                onClose={toggleModal}
                title="Add Staff"
                children={
                    <div className="flex flex-col justify-center items-center w-full">
                        <input
                            type="text"
                            name="name"
                            value={staffData.name}
                            onChange={handleChange}
                            className="border-2 p-2 m-2 w-full rounded"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="role"
                            value={staffData.role}
                            onChange={handleChange}
                            className="border-2 p-2 m-2 w-full rounded"
                            placeholder="Role"
                        />
                        <input
                            type="text"
                            name="staffID"
                            value={staffData.staffID}
                            onChange={handleChange}
                            className="border-2 p-2 m-2 w-full rounded"
                            placeholder="Staff ID"
                        />
                        <input
                            type="text"
                            name="department"
                            value={staffData.department}
                            onChange={handleChange}
                            className="border-2 p-2 m-2 w-full rounded"
                            placeholder="Department"
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border-2 p-2 m-2 w-full rounded"
                        />
                        {loading ? (
                            <button className="px-6 py-2 mt-5 bg-gray-500 cursor-not-allowed text-white rounded-lg font-inter w-fit text-lg font-bold">
                                Loading...
                            </button>
                        ) : (
                            <button
                                onClick={handleAddStaff}
                                className="px-6 py-2 mt-5 bg-amber-500 text-white rounded-lg font-inter w-fit text-lg font-bold"
                            >
                                Add
                            </button>
                        )}
                    </div>
                }
            />
            {tooltip && <div className="bg-white shadow-md fixed top-20 right-5 p-5">
                <p onClick={()=> router.push("/")} className="text-lg m-2 my-4">Entries</p>
                <p onClick={()=> router.push("/staff")} className="text-lg m-2 my-4">Staff</p>
                <p onClick={()=> router.refresh()} className="text-lg m-2 my-4">Refresh</p>
            </div>}
            
          

            {/* Settings Modal */}
            <Modal
                isOpen={settingModal}
                onClose={toggleSettingsModal}
                title="Settings"
                children={
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="flex text-slate-500 text-sm font-bold justify-start w-full"><span>Open</span></div>
                        <input type="time" className="border-2 p-2 m-2 w-full rounded" />
                        <div className="flex text-slate-500 text-sm font-bold justify-start w-full"><span>Close</span></div>
                        <input type="time" className="border-2 p-2 m-2 w-full rounded" />
                        <button
                            onClick={toggleSettingsModal}
                            className="px-6 py-2 mt-5 bg-amber-500 text-white rounded-lg font-inter w-fit text-lg font-bold"
                        >
                            Save
                        </button>
                    </div>
                }
            />
              <div className="fixed bottom-10 right-5">
                <div className={`bg-amber-500 rounded-full p-4 text-white cursor-pointer transform transition-transform duration-300 ${isFabOpen ? "rotate-45" : "rotate-0"}`} onClick={toggleFab}>
                    <FaPlus />
                </div>
            </div>
        </>
    );
};

export default SecurityPage;
