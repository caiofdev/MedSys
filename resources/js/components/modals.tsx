import { useState, useEffect, createContext, useContext, ReactNode, use } from "react"
import { useInitials } from '@/hooks/use-initials';
import { InputField } from "./input-field";
import { SelectField } from "./select-field";
import { faUser, faEnvelope, faIdCard, faPhone, faGear, faLocation, faIdCardClip, faCommentMedical, faCalendar, faKey} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


interface User {
    id: number
    name: string
    email: string
    cpf: string
    phone: string
    photo: string | undefined;
    is_master?: string
    medical_history?: string
    birth_date?: Date
    emergency_contact?: string
    gender?: string
    especiality?: string
    crm?: string
    register_number?: string
}


type ModalType = "view" | "edit" | "create";

type UserRole = "admin" | "receptionist" | "doctor" | "patient";

interface ModalProps {
    user: User | null;
    type: UserRole;
}

interface ModalContextType {

    preview: string;
    especiality: string;
    gender: string;
    is_master: string;

    formData: {
        name: string;
        email: string;
        cpf: string;
        phone: string;
        photo: string;
        is_master: string;
        medical_history: string;
        birth_date: string;
        emergency_contact: string;
        gender: string;
        especiality: string;
        crm: string;
        register_number: string;
        password: string;
    };

    appointmentFormData: {
        patient: User
        doctor: User
        date: string
        time: string
        price: number
    };

    searchQuery: string;
    filteredPatients: User[];
    selectedPatient: User | null;
    doctorQuery: string;
    filteredDoctors: User[];
    selectedDoctor: User | null;

    setPreview: (value: string) => void;
    setEspeciality: (value: string) => void;
    setGender: (value: string) => void;
    setIsMaster: (value: string) => void;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    setAppointmentFormData: React.Dispatch<React.SetStateAction<any>>;
    
    setSearchQuery: (value: string) => void;
    setFilteredPatients: (value: User[]) => void;
    setSelectedPatient: (value: User | null) => void;
    setDoctorQuery: (value: string) => void;
    setFilteredDoctors: (value: User[]) => void;
    setSelectedDoctor: (value: User | null) => void;

    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleAppointmentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

    handlePatientSelect: (patient: User) => void;
    handleDoctorSelect: (doctor: User) => void;
    handleCreateAppointment: () => void;

    resetFormData: () => void;
    resetAppointmentData: () => void;
    initializeEditMode: (user: User) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: { children: ReactNode }) {
    const [preview, setPreview] = useState("");
    const [especiality, setEspeciality] = useState("Selecione a especialidade");
    const [gender, setGender] = useState("Selecione o gênero");
    const [is_master, setIsMaster] = useState("Selecione a opção");
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        photo: "",
        is_master: "",
        medical_history: "",
        birth_date: "",
        emergency_contact: "",
        gender: "",
        especiality: "",
        crm: "",
        register_number: "",
        password: "",
    });
    
    const [appointmentFormData, setAppointmentFormData] = useState({
        patient: {} as User,
        doctor: {} as User,
        date: new Date().toISOString().split('T')[0],
        time: "",
        price: 0,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPatients, setFilteredPatients] = useState<User[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
    const [doctorQuery, setDoctorQuery] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState<User[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<User | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAppointmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'price') {
            const numericValue = value.replace(/[^\d.,]/g, '');
            const normalizedValue = numericValue.replace(',', '.');
            const numberValue = parseFloat(normalizedValue) || 0;
            setAppointmentFormData((prev) => ({ ...prev, [name]: numberValue }));
        } else {
            setAppointmentFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const formatPrice = (price: number): string => {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formatPriceForInput = (price: number): string => {
        if (price === 0) return '';
        return price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
    };
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "especiality") setEspeciality(value);
        if (name === "gender") setGender(value);
        if (name === "is_master") setIsMaster(value);
    };

    const handlePatientSelect = (patient: User) => {
        setSelectedPatient(patient);
        setAppointmentFormData((prev) => ({ ...prev, patient }));
        setSearchQuery(patient.name);
        setFilteredPatients([]);
    };

    const handleDoctorSelect = (doctor: User) => {
        setSelectedDoctor(doctor);
        setAppointmentFormData((prev) => ({ ...prev, doctor }));
        setDoctorQuery(doctor.name);
        setFilteredDoctors([]);
    };

    const handleCreateAppointment = () => {
        // #TODO: Implementar lógica de criação de consulta
        alert(`Consulta agendada para ${appointmentFormData.patient?.name} com ${appointmentFormData.doctor?.name}`);
        resetAppointmentData();
    };
    
    const resetFormData = () => {
        setFormData({
            name: "",
            email: "",
            cpf: "",
            phone: "",
            photo: "",
            is_master: "",
            medical_history: "",
            birth_date: "",
            emergency_contact: "",
            gender: "",
            especiality: "",
            crm: "",
            register_number: "",
            password: "",
        });
        setPreview("");
        setEspeciality("Selecione a especialidade");
        setGender("Selecione o gênero");
        setIsMaster("Selecione a opção");
    };
    
    const initializeEditMode = (user: User) => {
        setFormData({
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phone: user.phone,
            photo: user.photo || "",
            is_master: user.is_master || "",
            medical_history: user.medical_history || "",
            birth_date: user.birth_date?.toString() || "",
            emergency_contact: user.emergency_contact || "",
            gender: user.gender || "",
            especiality: user.especiality || "",
            crm: user.crm || "",
            register_number: user.register_number || "",
            password: "",
        });
        
        setPreview(user.photo || "");
        setEspeciality(user.especiality || "Selecione a especialidade");
        setGender(user.gender || "Selecione o gênero");
        setIsMaster(user.is_master || "Selecione a opção");
    };
    
    const resetAppointmentData = () => {
        setAppointmentFormData({
            patient: {} as User,
            doctor: {} as User,
            date: new Date().toISOString().split('T')[0],
            time: "",
            price: 0,
        });
        setSelectedPatient(null);
        setSearchQuery("");
        setFilteredPatients([]);
        setSelectedDoctor(null);
        setDoctorQuery("");
        setFilteredDoctors([]);
    };

    const value = {
        preview,
        especiality,
        gender,
        is_master,
        formData,
        appointmentFormData,
        
        searchQuery,
        filteredPatients,
        selectedPatient,
        doctorQuery,
        filteredDoctors,
        selectedDoctor,
        
        setPreview,
        setEspeciality,
        setGender,
        setIsMaster,
        setFormData,
        setAppointmentFormData,
        
        setSearchQuery,
        setFilteredPatients,
        setSelectedPatient,
        setDoctorQuery,
        setFilteredDoctors,
        setSelectedDoctor,
        
        handleChange,
        handleImageChange,
        handleSelectChange,
        handleAppointmentChange,
        
        handlePatientSelect,
        handleDoctorSelect,
        handleCreateAppointment,
        
        resetFormData,
        resetAppointmentData,
        initializeEditMode,
    };
    
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}


function ModalView({ user, type }: ModalProps)  {
    const getInitials = useInitials();

    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl overflow-y-auto">
        <DialogHeader>
            <DialogTitle className="text-white text-center p-2">Detalhes de {user ? user.name : type === "admin" ? "Administrador" : type === "receptionist" ? "Recepcionista" : type === "doctor" ? "Doutor" : "Paciente"}</DialogTitle>
            <DialogDescription className=" flex-col max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar">
            {user ? (
                <>
                <div className="flex justify-center">
                    <Avatar className="h-22 w-22 rounded-full border-2 border-[#9FA3AE]">
                    <AvatarImage src={user.photo} alt={user.name} />
                    <AvatarFallback className="bg-[#9fa3ae63] text-2xl">
                        {getInitials(user.name)}
                    </AvatarFallback>
                    </Avatar>
                </div>
                <InputField label="Nome" icon={<FontAwesomeIcon icon={faUser} />} value={user.name} disabled />
                <InputField label="E-mail" icon={<FontAwesomeIcon icon={faEnvelope} />} value={user.email} disabled />
                <div className="flex gap-3">
                    <InputField label="CPF" icon={<FontAwesomeIcon icon={faIdCard} />} value={user.cpf} disabled />
                    <InputField label="Telefone" icon={<FontAwesomeIcon icon={faPhone} />} value={user.phone} disabled />
                </div>

                { type=="doctor" && (
                <div className="flex gap-3">
                    <InputField label="CRM" icon={""} value={user.crm ?? ""} disabled />
                    <InputField label="Especialidade" icon={""} value={user.especiality ?? ""} disabled />
                </div>
                )}

                { type=="admin" && (
                    <InputField
                        label="Administrador Master"
                        icon={<FontAwesomeIcon icon={faGear} />}
                        value={user.is_master ? "Sim" : "Não"}
                        disabled
                    />
                )}

                { type=="receptionist" && (
                    <InputField
                        label="Número de Registro"
                        icon={<FontAwesomeIcon icon={faIdCardClip} />}
                        value={user.register_number ?? ""}
                        disabled
                    />
                )}

                { type=="patient" && (
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <InputField label="Gênero" icon={""} value={user.gender ?? ""} disabled />
                            <InputField label="Data de Nascimento" icon={<FontAwesomeIcon icon={faCalendar} />} value={user.birth_date?.toDateString() ?? ""} disabled />
                        </div>
                            <InputField
                                label="Contato de Emergência"
                                icon={<FontAwesomeIcon icon={faCommentMedical} />}
                                value={user.emergency_contact ?? ""}
                                disabled
                            />
                        <InputField
                                label="Histórico Médico"
                                value={user.medical_history ?? ""}
                                disabled
                                isTextArea={true}
                        />
                    </div>
                )}

                </>
            ) : (
                <p>Nenhum usuário selecionado.</p>
            )}

            <div className="w-full flex justify-center bg-white p-3 rounded-b-2xl">
                <DialogFooter>
                    <DialogClose className="text-white text-base bg-[#030D29] px-5 py-1 rounded hover:scale-105 hover:bg-[#7A2E2E] transition cursor-pointer">
                        Fechar
                    </DialogClose>
                </DialogFooter>
            </div>

            </DialogDescription>
        </DialogHeader>
        </DialogContent>
    );
}

function ModalEdit({ user, type }: ModalProps) {
    if (!user) return null;

    const {
        preview,
        especiality,
        gender,
        formData,
        handleChange,
        handleImageChange,
        handleSelectChange,
        initializeEditMode
    } = useModal();

    useEffect(() => {
        initializeEditMode(user);
    }, [user]);

    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl">
        <DialogHeader>
            <DialogTitle className="text-white text-center p-2">Editar {user ? user.name : type === "admin" ? "Administrador" : type === "receptionist" ? "Recepcionista" : type === "doctor" ? "Doutor" : "Paciente"}</DialogTitle>
            
            <DialogDescription className="flex-col max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24 border-2 border-[#9FA3AE]">
                    <AvatarImage src={preview} alt={user.name} />
                </Avatar>
                <label className="bg-[#9fa3ae63] p-1 rounded cursor-pointer text-sm">
                    Editar Foto
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
            </div>

            <InputField label="Nome" icon={<FontAwesomeIcon icon={faUser} />} name="name" value={formData.name} onChange={handleChange} />
            <InputField label="E-mail" icon={<FontAwesomeIcon icon={faEnvelope} />} name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Telefone" icon={<FontAwesomeIcon icon={faPhone} />} name="phone" value={formData.phone} onChange={handleChange} />

            { type=="doctor" && (
                <SelectField
                    label="Especialidade"
                    name="especiality"
                    value={especiality}
                    onChange={handleSelectChange}
                    options={[
                    { label: "especialidade", value: "especialidade" },
                    { label: "Teste1", value: "test1" },
                    { label: "Teste2", value: "test2" },
                    ]}
                />
            )}

            { type=="patient" && (
                <div className="flex flex-col gap-3">   
                    <InputField
                        label="Contato de Emergência"
                        icon={<FontAwesomeIcon icon={faCommentMedical} />}
                        name="emergency_contact"
                        value={formData.emergency_contact ?? ""}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Gênero"
                        name="gender"
                        value={gender}
                        onChange={handleSelectChange}
                        options={[
                        { label: "Feminino", value: "fem" },
                        { label: "Masculino", value: "masc" },
                        { label: "Outro", value: "other" },
                        ]}
                    />
                    <InputField
                        label="Histórico Médico"
                        name="medical_history"
                        value={formData.medical_history ?? ""}
                        onChange={handleChange}
                        isTextArea
                    />
            </div>
            )}

            <div className="w-full flex justify-center pt-4 gap-3">
                <button className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 hover:bg-[#1C4F4A] transition cursor-pointer">Salvar</button>
                <DialogClose className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 hover:bg-[#7A2E2E] transition cursor-pointer">Fechar</DialogClose>

            </div>
            </DialogDescription>
        </DialogHeader>
        </DialogContent>
    );
}

function ModalCreate ({user, type}: ModalProps){
    const {
        preview,
        especiality,
        gender,
        is_master,
        formData,
        handleChange,
        handleImageChange,
        handleSelectChange,
        resetFormData,
    } = useModal();
    
    useEffect(() => {
        resetFormData();
    }, []);

    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl ">
            <DialogHeader className="flex-shrink-0">
                <DialogTitle className="text-white text-center p-2 hover:bg-[#1C4F4A]">Criar {type === "admin" ? "Administrador" : type === "receptionist" ? "Recepcionista" : type === "doctor" ? "Doutor" : "Paciente"}</DialogTitle>
                <DialogDescription className="max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar flex-col">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24 border-2 border-[#9FA3AE]">
                            <AvatarImage src={preview} alt="Preview" />
                            <AvatarFallback>
                                <img src="default-user.png" />
                            </AvatarFallback>
                        </Avatar>       
                        <label className="bg-[#9fa3ae63] p-1 rounded cursor-pointer text-sm">
                            Adicionar Foto
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>
                    <InputField name="name" label="Nome" icon={<FontAwesomeIcon icon={faUser} />} value={formData.name} placeholder="Digite o nome" onChange={handleChange} />
                    <InputField name="email" label="E-mail" icon={<FontAwesomeIcon icon={faEnvelope} />} value={formData.email} placeholder="Digite o e-mail" onChange={handleChange} />
                    <InputField name="password" label="Senha" type="password" icon={<FontAwesomeIcon icon={faKey} />} value={formData.password} placeholder="Digite a senha" onChange={handleChange} />
                    <div className="flex gap-3">
                        <InputField name="phone" label="Telefone" icon={<FontAwesomeIcon icon={faPhone} />} value={formData.phone} 
                        placeholder="Digite o telefone" onChange={handleChange} />
                        <InputField name="cpf" label="CPF" icon={<FontAwesomeIcon icon={faIdCard} />} value={formData.cpf} placeholder="Digite o CPF" onChange={handleChange} />
                    </div>

                    {type === "patient" && (
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <SelectField
                                    name="gender"
                                    label="Gênero"
                                    options={[
                                        { label: "Feminino", value: "fem" },
                                        { label: "Masculino", value: "masc" },
                                        { label: "Outro", value: "other" },
                                    ]}
                                    onChange={handleSelectChange}
                                    value={gender}
                                />
                                <InputField name="birth_date" label="Data de Nascimento" icon={<FontAwesomeIcon icon={faCalendar} />} value={formData.birth_date} type="date" onChange={handleChange} />
                            </div>
                            <InputField name="emergency_contact" label="Contato de Emergência" icon={<FontAwesomeIcon icon={faCommentMedical} />} value={formData.emergency_contact} placeholder="Digite o contato de emergência" onChange={handleChange} />
                            <InputField name="medical_history" label="Histórico Médico" value={formData.medical_history} isTextArea={true} placeholder="Digite o histórico médico" onChange={handleChange} />
                        </div>
                    )}

                    {type === "doctor" && (
                        <div className="flex gap-3">
                            <InputField name="crm" label="CRM" icon={<FontAwesomeIcon icon={faIdCardClip} />} value={formData.crm} placeholder="Digite o CRM" onChange={handleChange} />
                            <SelectField
                                name="especiality"
                                label="Especialidade"
                                options={[
                                    { label: "Cardiologia", value: "cardiology" },
                                    { label: "Pediatria", value: "pediatrics" },
                                    { label: "Ortopedia", value: "orthopedics" },
                                ]}
                                onChange={handleSelectChange}
                                value={especiality}
                            />
                        </div>
                    )}

                    {type === "receptionist" && (
                        <InputField name="register_number" label="Número de Registro" icon={<FontAwesomeIcon icon={faIdCardClip} />} value={formData.register_number} placeholder="Digite o número de registro" onChange={handleChange} />
                    )}

                    {type === "admin" && (
                        <SelectField
                            name="is_master"
                            label="Administrador Master"
                            options={[
                                { label: "Sim", value: "yes" },
                                { label: "Não", value: "no" },
                            ]}
                            onChange={handleSelectChange}
                            value={is_master}
                        />
                    )}

                    <div className="w-full flex justify-center pt-4 gap-3">
                        <button className=" bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer hover:bg-[#1C4F4A]"> Criar </button>
                        <DialogClose className="bg-[#030D29] text-white px-5 py-1 rounded hover:scale-105 hover:bg-[#7A2E2E] transition cursor-pointer text-base">Fechar</DialogClose>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
}

function ModalDelete({ user, type }: ModalProps) {
    if (!user) return null;

    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl overflow-y-auto">
        <DialogHeader>
            <DialogTitle className="text-white text-center p-2">Excluir {user ? user.name : type === "admin" ? "Administrador" : type === "receptionist" ? "Recepcionista" : type === "doctor" ? "Doutor" : "Paciente"}</DialogTitle>
            <DialogDescription className=" flex flex-col items-center text-base bg-white text-[#030D29] rounded-b-2xl space-y-4 p-7">
                Tem certeza que deseja excluir o usuário {user.name}?
                <div className="w-full flex justify-center bg-white p-3 rounded-b-2xl">
                    <DialogFooter>
                    <DialogClose className="text-white text-base bg-[#030D29] px-5 py-1 rounded hover:scale-105 transition cursor-pointer">
                        Excluir
                    </DialogClose>
                    <DialogClose className="text-white text-base bg-[#030D29] px-5 py-1 rounded hover:scale-105 hover:bg-[#7A2E2E] transition cursor-pointer">
                        Fechar
                    </DialogClose>
                    </DialogFooter>
                </div>
            </DialogDescription>
        </DialogHeader>

        </DialogContent>
    );
}

function ModalAppointment({ receptionist, patients, doctors }: { receptionist: User | null, patients: User[], doctors: User[] }) {
    const {
        appointmentFormData,
        searchQuery,
        filteredPatients,
        selectedPatient,
        doctorQuery,
        filteredDoctors,
        selectedDoctor,
        setSearchQuery,
        setFilteredPatients,
        setSelectedPatient,
        setDoctorQuery,
        setFilteredDoctors,
        setSelectedDoctor,
        handleAppointmentChange,
        handlePatientSelect,
        handleDoctorSelect,
        handleCreateAppointment,
        resetAppointmentData
    } = useModal();

    const formatPrice = (price: number): string => {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formatPriceForInput = (price: number): string => {
        if (price === 0) return '';
        return price.toLocaleString('pt-BR');
    };

    useEffect(() => {
        resetAppointmentData();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredPatients([]);
        } else {
            setFilteredPatients(
                patients.filter(p =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, patients]);

    useEffect(() => {
        if (doctorQuery.trim() === "") {
            setFilteredDoctors([]);
        } else {
            setFilteredDoctors(
                doctors.filter(d =>
                    d.name.toLowerCase().includes(doctorQuery.toLowerCase())
                )
            );
        }
    }, [doctorQuery, doctors]);

    if (!receptionist) return null;

    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl">
            <DialogHeader className="flex-shrink-0">
                <DialogTitle className="text-white text-center p-2">Agendar Consulta</DialogTitle>
                <DialogDescription className="max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar flex-col">
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <InputField
                                name="patient"
                                label="Paciente"
                                value={searchQuery}
                                onChange={e => {
                                    setSearchQuery(e.target.value);
                                    setSelectedPatient(null);
                                }}
                                placeholder="Busque pelo nome do paciente"
                            />
                            {filteredPatients.length > 0 && (
                                <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto shadow">
                                    {filteredPatients.map(p => (
                                        <li
                                            key={p.id}
                                            className="px-3 py-2 cursor-pointer hover:bg-[#f0f0f0]"
                                            onClick={() => handlePatientSelect(p)}
                                        >
                                            {p.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="relative">
                            <InputField
                                name="doctor"
                                label="Doutor"
                                value={doctorQuery}
                                onChange={e => {
                                    setDoctorQuery(e.target.value);
                                    setSelectedDoctor(null);
                                }}
                                placeholder="Busque pelo nome do doutor"
                            />
                            {filteredDoctors.length > 0 && (
                                <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto shadow">
                                    {filteredDoctors.map(d => (
                                        <li
                                            key={d.id}
                                            className="px-3 py-2 cursor-pointer hover:bg-[#f0f0f0]"
                                            onClick={() => handleDoctorSelect(d)}
                                        >
                                            {d.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <InputField name="date" label="Data" type="date" value={appointmentFormData.date} onChange={handleAppointmentChange} />
                            <InputField name="time" label="Hora" type="time" value={appointmentFormData.time} onChange={handleAppointmentChange} />
                        </div>
                        <div className="flex flex-col">
                            <InputField
                                name="price"
                                label="Preço da Consulta"
                                type="text"
                                value={formatPriceForInput(appointmentFormData.price)}
                                onChange={handleAppointmentChange}
                                placeholder="0,00"
                            />
                            {appointmentFormData.price > 0 && (
                                <div className="text-sm text-gray-600 mt-1">
                                    Valor: {formatPrice(appointmentFormData.price)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex justify-center pt-4 gap-3">
                        <button
                            className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer hover:bg-[#1C4F4A]"
                            onClick={handleCreateAppointment}
                            disabled={!selectedPatient || !selectedDoctor}
                        >
                            Agendar
                        </button>
                        <DialogClose className="bg-[#030D29] text-white px-5 py-1 rounded hover:scale-105 hover:bg-[#7A2E2E] transition cursor-pointer text-base">Fechar</DialogClose>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
}

export{
    ModalView,
    ModalEdit,
    ModalCreate,
    ModalDelete,
    ModalProvider,
    useModal,
    ModalAppointment
}