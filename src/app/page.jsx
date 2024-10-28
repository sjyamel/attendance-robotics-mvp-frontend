"use client";

import { useRouter } from "next/navigation";
import Modal from "./components/Modal";

function Main(){
    const router = useRouter();
    return(
        <>
        <button className="text-2xl m-2 font-bold" onClick={()=>router.push("/security")}>
            &larr;
        </button>
        <div className="flex flex-col w-10/12 mx-auto gap-16 px-8 mt-20 font-inter">
        
            <div className="mx-auto">
                <img className="size-32 rounded-full border-8 border-white shadow-lg" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" />
            <h2 className="text-xl font-bold">Sulaiman Jabir</h2>
            </div>
            <div className="ml-4 flex flex-col gap-4">
                <p><span className="font-bold text-lg">Role:</span> <span>User</span></p>
                <p><span className="font-bold text-lg">Department:</span> <span>Software</span></p>
                <p><span className="font-bold text-lg">Employee ID:</span> <span>234567</span></p>
            </div>
        </div>
        
            
        </>
    );
}
export default Main;