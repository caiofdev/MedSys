
import { faEye, faPencil, faTrashCan, faMagnifyingGlass, faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBox from './ui/search-box';

interface User {
    id: number;
    name: string;
    email: string;
}

interface TableProps {
    users: User[];
}

export default function Table({ users }: TableProps) {
    return (
            <div className='flex flex-col gap-5'>
                <div className='flex flex-row justify-between ml-30 mr-30'>
                    <SearchBox placeHolder="Buscar..."/>
                    <div className='flex items-center justify-center text-4xl hover:scale-110 hover:text-[#030d29e1] transition duration-200 cursor-pointer '>
                        <FontAwesomeIcon icon={faCirclePlus}/>
                    </div>
                </div>
            <div className="flex ml-30 mr-30 items-center justify-center">
                <table className="w-full border-separate border-spacing-y-2 text-left items-center">
                    <thead>
                        <tr className="flex bg-[#030D29] text-white font-bold rounded-md items-center justify-center">
                            <th className="w-full p-3 rounded-l-md">ID</th>
                            <th className="w-full p-3">Nome</th>
                            <th className="w-full p-3">E-mail</th>
                            <th className="flex w-full p-3 rounded-r-md justify-center items-center">Operações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="flex bg-white shadow-sm rounded mb-2">
                                <td className="w-full p-3 font-bold rounded-l-md">{user.id}</td>
                                <td className="w-full p-3 font-bold">{user.name}</td>
                                <td className="w-full p-3 font-bold">{user.email}</td>
                                <td className="w-full p-3 font-bold items-center justify-center rounded-r-md">
                                    <div className="w-full flex gap-6 items-center justify-center">
                                    <button className="text-xl text-[#030D29] hover:scale-120 transition duration-200 cursor-pointer">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button className="text-xl text-[#030D29] hover:scale-120 transition duration-200 cursor-pointer">
                                        <FontAwesomeIcon icon={faPencil} />
                                    </button>
                                    <button className="text-xl text-[#030D29] hover:scale-120 transition duration-200 cursor-pointer">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
