import { X } from "lucide-react";
import { ReactNode } from "react";

interface InterfaceModal {
    
        open: boolean,
        onClose: () => void,
        children: ReactNode
    
}

export default function Modal({ open, onClose, children}:InterfaceModal){
    return (
        <div 
        onClick={onClose}
        className={`fixed z-10 inset-0 flex justify-center items-center transition-colors ${open  ? "visible bg-black/20" : "invisible"}`} >
            {/* modal */}
            <div 
            onClick={e => e.stopPropagation()}
            className={`
                bg-primary-800 w-[512px] rounded-xl shadow p-6 transition-all
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}>
                    <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 
                    bg-gray-800 hover:bg-gray-900 hover:text-gray-600" ><X/></button>
                    {children}
                </div>
            
        </div>
    )
}