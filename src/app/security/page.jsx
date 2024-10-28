"use client";
import { useState } from "react";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";

const SecurityPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [settingModal, setSettingModal] = useState(false);

    const toggleSettingsModal = () => setSettingModal(prev=>!prev);
    const toggleModal = () => setModalIsOpen(prev=>!prev);

    const router = useRouter();
    return (
        <>
        <div>
            <div className="flex justify-center gap-2 w-full px-6 mb-2">
            <button onClick={() => router.push("/")} className="px-2 py-2 mt-5 bg-amber-500 text-white rounded-lg font-inter w-fit top-0 right-4 text-lg font-bold">Security</button>
            <button onClick={toggleModal} className="px-2 py-2 mt-5 bg-amber-500 text-white rounded-lg font-inter w-fit top-0 right-4 text-lg font-bold">Add Staff</button>
            <button onClick={toggleSettingsModal} className="px-2 py-2 mt-5 bg-amber-500 text-white rounded-lg font-inter w-fit top-0 right-4 text-lg font-bold">Settings</button>
            
            </div>
            <div className="w-10/12  rounded-md shadow-lg  mx-auto h-40 px-3 py-8 font-inter mt-2">
            <h3 className="text-center text-3xl font-bold">12</h3>
            <p className="text-center font-bold text-zinc-600 text-xl mt-6">Total People that came in</p></div>
            <div className="w-10/12 rounded-md shadow-lg  mx-auto h-40 px-3 py-8 font-inter mt-10 ">
            <h3 className="text-center text-3xl font-bold">8</h3>
            <p className="text-center font-bold text-zinc-600 mt-6 text-xl">Total Present</p></div>
            <div className="w-10/12 rounded-md shadow-lg  mx-auto h-40 px-3 py-8 font-inter mt-10 ">
            <h3 className="text-center text-3xl font-bold">8</h3>
            <p className="text-center font-bold text-zinc-600 mt-6 text-xl">Total Staff</p></div>
        </div>
        <Modal isOpen={modalIsOpen} onClose={toggleModal} title="Add Staff" children={
            (
                <div className="flex flex-col justify-center items-center w-full">
                    <input type="text" className="border-2 p-2 m-2 w-full rounded" placeholder="Name"/>
                    <input type="text" className="border-2 p-2 m-2 w-full rounded" placeholder="Role"/>
                    <input type="text" className="border-2 p-2 m-2 w-full rounded" placeholder="StaffID"/>
                    <input type="text" className="border-2 p-2 m-2 w-full rounded" placeholder="Department"/>
                    <input type="file" className="border-2 p-2 m-2 w-full rounded" />
                    <button onClick={toggleModal} className="px-6 py-2 mt-5 bg-amber-500 text-white rounded-lg font-inter w-fit top-0 right-4 text-lg font-bold">Add</button>
                </div>
            )
        }/>
        <Modal isOpen={settingModal} onClose={toggleSettingsModal} title="Settings" children={
            (
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="flex text-slate-500 text-sm font-bold justify-start w-full">
                        <span>Open</span>
                    </div>
                    <input type="time" className="border-2 p-2 m-2 w-full rounded"/>
                    <div className="flex text-slate-500 text-sm font-bold justify-start w-full">
                        <span>Close</span>
                    </div>
                    <input type="time" className="border-2 p-2 m-2 w-full rounded"/>
                    
                    <button onClick={toggleSettingsModal} className="px-6 py-2 mt-5 bg-amber-500 text-white rounded-lg font-inter w-fit top-0 right-4 text-lg font-bold">Save</button>
                </div>
            )
        }/>
        </>

    )

}

export default SecurityPage;