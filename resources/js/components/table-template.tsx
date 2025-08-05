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
    birth_date?: Date | string
    emergency_contact?: string
    gender?: string 
    crm?: string
    register_number?: string
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
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    const handleAction = async (user: User | null, action: "view" | "edit" | "delete" | "create") => {
        setOperation(action);
        
        if (action === "view" && user) {
            setIsLoadingDetails(true);
            try {
                let detailsUrl = '';
                switch (type) {
                    case 'admin':
                        detailsUrl = `/admin/admins/${user.id}`;
                        break;
                    case 'doctor':
                        detailsUrl = `/admin/doctors/${user.id}`;
                        break;
                    case 'receptionist':
                        detailsUrl = `/admin/receptionists/${user.id}`;
                        break;
                    case 'patient':
                        detailsUrl = `/receptionist/patients/${user.id}`;
                        break;
                    default:
                        throw new Error('Tipo de usuário inválido');
                }

                const response = await fetch(detailsUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    },
                });

                if (response.ok) {
                    const detailedUser = await response.json();
                    setSelectedUser(detailedUser);
                } else {
                    console.error('Erro ao buscar detalhes do usuário');
                    setSelectedUser(user);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes:', error);
                setSelectedUser(user);
            } finally {
                setIsLoadingDetails(false);
            }
        } else {
            setSelectedUser(user);
        }
        
        setOpen(true);
    };

    return (
        <div className="flex flex-col ml-30 mr-30 items-center justify-center">
            <div className="w-full flex flex-col">
                <div className="flex w-full justify-start mb-0">
                    <div 
                        className="flex w-fit bg-[#030D29] text-white p-1 pr-2 pl-2 rounded-t-2xl m-0 border-b-1 border-[#ffffff1c] transition duration-200 cursor-pointer hover:bg-[#030D29e1]"
                        onClick={() => handleAction(null, "create")}
                    >
                        <div className="flex items-center justify-center m-0">
                            <div className="flex p-2 text-sm">
                                NOVO {type === "admin" ? "ADMINISTRADOR" : type === "receptionist" ? "RECEPCIONISTA" : type === "doctor" ? "DOUTOR" : "PACIENTE"}
                            </div>
                            <FontAwesomeIcon className="text-2xl" icon={faCirclePlus}/>
                        </div>
                    </div>
                </div>
                
                <table className="w-full text-left items-center">  
                    <thead>
                        <tr className="flex bg-[#030D29] text-white font-bold mb-2 rounded-b-md rounded-r-md items-center justify-center">
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
                                            onClick={() => handleAction(user, "delete")}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
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
