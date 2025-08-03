import { useState, useEffect, createContext, useContext, ReactNode } from "react"
import { useInitials } from '@/hooks/use-initials';
import { InputField } from "./input-field";
import { SelectField } from "./select-field";
import { faUser, faEnvelope, faIdCard, faPhone, faGear, faIdCardClip, faCommentMedical, faCalendar, faKey} from "@fortawesome/free-solid-svg-icons";
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
    is_master?: string | boolean
    medical_history?: string
    birth_date?: Date
    emergency_contact?: string
    gender?: string
    especiality?: string
    crm?: string
    register_number?: string
    address?: Address
}

interface Address {
    country: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    postal_code: string;
    number: string;
}

type ModalType = "view" | "edit" | "create";

type UserRole = "admin" | "receptionist" | "doctor" | "patient";

interface ModalProps {
    user: User | null;
    type: UserRole;
}

interface ModalContextType {

    renderAddress: string;
    renderDescription: string;
    
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
    
    addressFormData: {
        country: string;
        state: string;
        city: string;
        street: string;
        neighborhood: string;
        postal_code: string;
        number: string;
    };
    
    setRenderAddress: (value: string) => void;
    setRenderDescription: (value: string) => void;
    setPreview: (value: string) => void;
    setEspeciality: (value: string) => void;
    setGender: (value: string) => void;
    setIsMaster: (value: string) => void;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    setAddressFormData: React.Dispatch<React.SetStateAction<any>>;
    
    handleNext: () => void;
    handleBack: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleAddressChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    
    resetFormData: () => void;
    resetAddressData: () => void;
    initializeEditMode: (user: User) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: { children: ReactNode }) {

    const [renderAddress, setRenderAddress] = useState('none');
    const [renderDescription, setRenderDescription] = useState('flex');
    
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
    
    const [addressFormData, setAddressFormData] = useState({
        country: "",
        state: "",
        city: "",
        street: "",
        neighborhood: "",
        postal_code: "",
        number: "",
    });
    
    const handleNext = () => {
        setRenderDescription('none');
        setRenderAddress('flex');
    };
    
    const handleBack = () => {
        setRenderDescription('flex');
        setRenderAddress('none');
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAddressFormData((prev) => ({ ...prev, [name]: value }));
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
    
    const resetAddressData = () => {
        setAddressFormData({
            country: "",
            state: "",
            city: "",
            street: "",
            neighborhood: "",
            postal_code: "",
            number: "",
        });
    };
    
    const initializeEditMode = (user: User) => {
        setFormData({
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phone: user.phone,
            photo: user.photo || "",
            is_master: typeof user.is_master === 'boolean' 
                ? (user.is_master ? "yes" : "no")
                : (user.is_master || ""),
            medical_history: user.medical_history || "",
            birth_date: user.birth_date?.toString() || "",
            emergency_contact: user.emergency_contact || "",
            gender: user.gender || "",
            especiality: user.especiality || "",
            crm: user.crm || "",
            register_number: user.register_number || "",
            password: "",
        });
        
        setAddressFormData({
            country: user.address?.country || "",
            state: user.address?.state || "",
            city: user.address?.city || "",
            street: user.address?.street || "",
            neighborhood: user.address?.neighborhood || "",
            postal_code: user.address?.postal_code || "",
            number: user.address?.number || "",
        });
        
        setPreview(user.photo || "");
        setEspeciality(user.especiality || "Selecione a especialidade");
        setGender(user.gender || "Selecione o gênero");
        setIsMaster(
            typeof user.is_master === 'boolean' 
                ? (user.is_master ? "yes" : "no")
                : (user.is_master || "Selecione a opção")
        );
    };
    
    const value = {

        renderAddress,
        renderDescription,
        preview,
        especiality,
        gender,
        is_master,
        formData,
        addressFormData,
        
        setRenderAddress,
        setRenderDescription,
        setPreview,
        setEspeciality,
        setGender,
        setIsMaster,
        setFormData,
        setAddressFormData,
        
        handleNext,
        handleBack,
        handleChange,
        handleAddressChange,
        handleImageChange,
        handleSelectChange,
        
        resetFormData,
        resetAddressData,
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
    const { renderAddress, renderDescription, handleNext, handleBack } = useModal();

    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl overflow-y-auto">
        <DialogHeader>
            <DialogTitle className="text-white text-center p-2">Detalhes de {user ? user.name : type === "admin" ? "Administrador" : type === "receptionist" ? "Recepcionista" : type === "doctor" ? "Doutor" : "Paciente"}</DialogTitle>
            
            <ModalAddress 
                user={user} 
                modalType='view' 
                address={user?.address || null} 
            />
            
            <DialogDescription className=" flex-col max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar" style={{ display: renderDescription }}>
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
                        value={
                            (typeof user.is_master === 'boolean' && user.is_master) || 
                            user.is_master === 'Sim' || 
                            user.is_master === 'yes' || 
                            user.is_master === '1'
                                ? "Sim" 
                                : "Não"
                        }
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
                    {type === "patient" && (
                        <div className="w-full flex justify-center">
                            <button 
                                onClick={handleNext}
                                className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer"
                            >
                                Ver Endereço
                            </button>
                        </div>
                    )}
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
        renderAddress,
        renderDescription,
        handleNext,
        handleBack,
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

            <ModalAddress 
                user={user} 
                modalType='edit' 
                address={user?.address || null} 
            />
            
            <DialogDescription className="flex-col max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar" style={{ display: renderDescription }}>
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
                {type === "patient" && (
                    <div className="flex justify-center">
                        <button 
                            onClick={handleNext}
                            className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer"
                        >
                            Editar Endereço
                        </button>
                    </div>
                )}
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
        renderAddress,
        renderDescription,
        formData,
        handleNext,
        handleBack,
        handleChange,
        handleImageChange,
        handleSelectChange,
        resetFormData,
        resetAddressData
    } = useModal();
    
    useEffect(() => {
        resetFormData();
        resetAddressData();
    }, []);

    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl ">
            <DialogHeader className="flex-shrink-0">
                <DialogTitle className="text-white text-center p-2 hover:bg-[#1C4F4A]">Criar {type === "admin" ? "Administrador" : type === "receptionist" ? "Recepcionista" : type === "doctor" ? "Doutor" : "Paciente"}</DialogTitle>
                <ModalAddress 
                    user={user} 
                    modalType='create' 
                    address={user?.address || null} 
                />
                <DialogDescription className="max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar flex-col" style={{ display: renderDescription }}>
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
                        <button className=" bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer hover:bg-[#1C4F4A]" style={{ display: type === "patient" ? "none" : "flex" }}> Criar </button>
                        <DialogClose className="bg-[#030D29] text-white px-5 py-1 rounded hover:scale-105 hover:bg-[#7A2E2E] transition cursor-pointer text-base">Fechar</DialogClose>
                        {type === "patient" && (
                            <div className="flex justify-center">
                                <button 
                                    onClick={handleNext}
                                    className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer"
                                >
                                    Próximo
                                </button>
                            </div>
                        )}
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

function ModalAddress({ user, address, modalType }: { user: User | null, address: Address | null, modalType: ModalType }) {

    const {
        renderAddress,
        addressFormData,
        handleAddressChange,
        handleBack
    } = useModal();

    let disabledInput;
    if (!user && modalType !== "create") return null;

    if (modalType === "edit" || modalType === "create") {
        disabledInput = false;
    } else if (modalType === "view") {
        disabledInput = true;
    }

    return (
        <DialogDescription className="max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar flex-col" style={{ display: renderAddress }}>
            <div className="flex items-center text-lg w-full justify-center">
                {modalType === "view" ? "Endereço do Paciente" : modalType === "edit" ? "Editar Endereço do Paciente" : "Informe o endereço do Paciente"}
            </div>
            <div className="flex flex-col gap-3">
                <InputField name="country" label="País" value={addressFormData.country} disabled={disabledInput} onChange={handleAddressChange} placeholder={!disabledInput? "Informe o país" : ""}/>
                <InputField name="state" label="Estado" value={addressFormData.state} disabled={disabledInput} onChange={handleAddressChange} placeholder={!disabledInput? "Informe o estado" : ""}/>
                <InputField name="city" label="Cidade" value={addressFormData.city} disabled={disabledInput} onChange={handleAddressChange} placeholder={!disabledInput? "Informe a cidade" : ""}/>
                <InputField name="street" label="Rua" value={addressFormData.street} disabled={disabledInput} onChange={handleAddressChange} placeholder={!disabledInput? "Informe a rua" : ""}/>
                <InputField name="neighborhood" label="Bairro" value={addressFormData.neighborhood} disabled={disabledInput} onChange={handleAddressChange} placeholder={!disabledInput? "Informe o bairro" : ""}/>
                <div className="flex gap-3">
                    <InputField name="postal_code" label="CEP" value={addressFormData.postal_code} disabled={disabledInput} onChange={handleAddressChange} placeholder={!disabledInput? "Informe o CEP" : ""}/>
                    <InputField name="number" label="Número" value={addressFormData.number} disabled={disabledInput} onChange={handleAddressChange} placeholder={!disabledInput? "Informe o número" : ""}/>
                </div>
            </div>
            <div className="w-full flex justify-center pt-4 gap-3">
                <button 
                    onClick={handleBack} 
                    className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer"
                > 
                    Voltar
                </button>
                {modalType === "edit" && (
                    <button 
                        className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 hover:bg-[#1C4F4A] transition cursor-pointer"
                    > 
                        Salvar Endereço
                    </button>
                )}
                {modalType === "create" && (
                    <button 
                        className="bg-[#030D29] text-white text-base px-5 py-1 rounded hover:scale-105 hover:bg-[#1C4F4A] transition cursor-pointer"
                    > 
                        Criar
                    </button>
                )}
                <DialogClose className="bg-[#030D29] text-white px-5 py-1 rounded hover:scale-105 hover:bg-[#7A2E2E] transition cursor-pointer text-base">Fechar</DialogClose>
            </div>
        </DialogDescription>
    );
}

export{
    ModalView,
    ModalEdit,
    ModalCreate,
    ModalDelete,
    ModalProvider,
    useModal
}