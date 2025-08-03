import { useState } from "react"
import { faEye, faPencil, faTrashCan, faCirclePlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Dialog} from "@/components/ui/dialog"
import {ModalView, ModalEdit, ModalCreate, ModalDelete, ModalProvider} from "./modals"


interface User {
    id: number
    name: string
    email: string
    cpf: string
    phone: string
    is_master?: string
    photo: string | undefined;
    medical_history?: string
    birth_date?: Date
    emergency_contact?: string
    gender?: string 
    especiality?: string
}

type UserRole = "admin" | "receptionist" | "doctor" | "patient";

interface TableProps {
    users: User[];
    type: UserRole;
}
export default function Table({ users, type}: TableProps) {

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [operation, setOperation] = useState<"view" | "edit" | "delete" | "create" | null>(null);

    const handleAction = (user: User | null, action: "view" | "edit" | "delete" | "create") => {
        setSelectedUser(user);
        setOperation(action);
        setOpen(true);
    };

    return (
        <div className="flex flex-col ml-30 mr-30 items-center justify-center">
        <table className="w-full border-separate border-spacing-y-2 text-left items-center">  
            <thead>
            <div className='flex w-full' >
                <div 
                    className="flex w-fit bg-[#030D29] text-white p-1 pr-2 pl-2 rounded-t-2xl m-0 border-b-1 border-[#ffffff59] transition duration-200 cursor-pointer hover:bg-[#030D29e1]"
                    onClick={() => handleAction(null, "create")}>
                    <div className="flex items-center justify-center m-0">
                        <div className="flex p-2 text-sm">NOVO {type === "admin" ? "ADMINISTRADOR" : type === "receptionist" ? "RECEPCIONISTA" : type === "doctor" ? "DOUTOR" : "PACIENTE"} </div>
                        <FontAwesomeIcon className="text-2xl" icon={faCirclePlus}/>
                    </div>
                </div>
            </div>
            <tr className="flex bg-[#030D29] text-white font-bold rounded-b-md rounded-r-md items-center justify-center">
                <th className="w-full p-3">ID</th>
                <th className="w-full p-3">Nome</th>
                <th className="w-full p-3">E-mail</th>
                <th className="flex w-full p-3 rounded-r-md justify-center items-center">Operações</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} className="flex bg-white shadow-sm rounded mb-2">
                <td className="w-full p-3 font-bold rounded-l-md">{user.id}</td>
                <td className="w-full p-3 font-bold">{user.name}</td>
                <td className="w-full p-3 font-bold">{user.email}</td>
                <td className="w-full p-3 font-bold items-center justify-center rounded-r-md">
                    <div className="w-full flex gap-6 items-center justify-center">
                    <button
                        className="text-xl text-[#030D29] hover:scale-120 transition duration-200 cursor-pointer"
                        onClick={() => handleAction(user, "view")}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button 
                        className="text-xl text-[#030D29] hover:scale-120 transition duration-200 cursor-pointer"
                        onClick={() => handleAction(user, "edit")}
                    >
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button 
                        className="text-xl text-[#030D29] hover:scale-120 transition duration-200 cursor-pointer"
                        onClick={() => handleAction(user, "delete")}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <ModalProvider>
            <Dialog open={open} onOpenChange={setOpen} >
                {operation === "view" && <ModalView user={selectedUser} type={type} />}
                {operation === "edit" && <ModalEdit user={selectedUser} type={type} />}
                {operation === "create" && <ModalCreate user={selectedUser} type={type} />}
                {operation === "delete" && <ModalDelete user={selectedUser} type={type} />}
            </Dialog>
        </ModalProvider>
        </div>
    )
}
