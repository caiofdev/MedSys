import { useState, useEffect, createContext, useContext, ReactNode, useRef } from "react"
import { useInitials } from '@/hooks/use-initials';
import { InputField } from "./input-field";
import { SelectField } from "./select-field";
import { faUser, faEnvelope, faIdCard, faPhone, faGear, faIdCardClip, faCommentMedical, faCalendar, faKey} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import InputError from "./input-error";

const validateUserData = (formData: any, type: string, isEdit: boolean = false, fileInput?: HTMLInputElement | null) => {
    const errors: string[] = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push("Nome é obrigatório");
    }
    
    if (!formData.email || formData.email.trim() === '') {
        errors.push("E-mail é obrigatório");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.push("E-mail deve ter um formato válido");
        }
    }
    
    if (!isEdit) {
        if (!formData.cpf || formData.cpf.trim() === '') {
            errors.push("CPF é obrigatório");
        } else {
            const cleanCpf = formData.cpf.replace(/\D/g, '');
            if (cleanCpf.length !== 11) {
                errors.push("CPF deve ter 11 dígitos");
            }
        }
    }
    
    if (!formData.phone || formData.phone.trim() === '') {
        errors.push("Telefone é obrigatório");
    } else if (formData.phone.length > 20) {
        errors.push("Telefone deve ter no máximo 20 caracteres");
    }
    
    if (!isEdit) {
        if (!formData.password || formData.password.trim() === '') {
            errors.push("Senha é obrigatória");
        } else if (formData.password.length < 6) {
            errors.push("Senha deve ter pelo menos 6 caracteres");
        }
        
        if (!formData.birth_date) {
            errors.push("Data de nascimento é obrigatória");
        }
    }

    if (type === "admin" && !isEdit) {
        if (!formData.is_master || !['yes', 'no'].includes(formData.is_master)) {
            errors.push("Administrador Master deve ser 'Sim' ou 'Não'");
        }
    }

    if (type === "doctor" && !isEdit) {
        if (!formData.crm || formData.crm.trim() === '') {
            errors.push("CRM é obrigatório");
        }
    }

    if (type === "receptionist" && !isEdit) {
        if (!formData.register_number || formData.register_number.trim() === '') {
            errors.push("Número de registro é obrigatório");
        }
    }

    if (type === "patient" && !isEdit) {
        if (!formData.gender || formData.gender === "Selecione o gênero") {
            errors.push("Gênero é obrigatório");
        }
        if (!formData.emergency_contact || formData.emergency_contact.trim() === '') {
            errors.push("Contato de emergência é obrigatório");
        }
    }

    if (fileInput?.files?.[0]) {
        const file = fileInput.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        const maxSize = 2048 * 1024;
        
        if (!allowedTypes.includes(file.type)) {
            errors.push("Foto deve ser do tipo: JPEG, PNG, JPG ou GIF");
        }
        
        if (file.size > maxSize) {
            errors.push("Foto deve ter no máximo 2MB");
        }
    }

    return errors;
};

const validateAddressData = (addressFormData: any) => {
    const errors: string[] = [];
    
    if (!addressFormData.country || addressFormData.country.trim() === '') {
        errors.push("País é obrigatório");
    }
    
    if (!addressFormData.state || addressFormData.state.trim() === '') {
        errors.push("Estado é obrigatório");
    }
    
    if (!addressFormData.city || addressFormData.city.trim() === '') {
        errors.push("Cidade é obrigatória");
    }
    
    if (!addressFormData.street || addressFormData.street.trim() === '') {
        errors.push("Rua é obrigatória");
    }
    
    if (!addressFormData.neighborhood || addressFormData.neighborhood.trim() === '') {
        errors.push("Bairro é obrigatório");
    }
    
    if (!addressFormData.postal_code || addressFormData.postal_code.trim() === '') {
        errors.push("CEP é obrigatório");
    } else {
        const cleanCep = addressFormData.postal_code.replace(/\D/g, '');
        if (cleanCep.length !== 8) {
            errors.push("CEP deve ter 8 dígitos");
        }
    }
    
    if (!addressFormData.number || addressFormData.number.trim() === '') {
        errors.push("Número é obrigatório");
    }

    return errors;
};

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
        if (name === "gender") {
            setGender(value);
            setFormData((prev) => ({ ...prev, gender: value }));
        }
        if (name === "is_master") {
            setIsMaster(value);
            setFormData((prev) => ({ ...prev, is_master: value }));
        }
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
            crm: "",
            register_number: "",
            password: "",
        });
        setPreview("");
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
        gender,
        is_master,
        formData,
        addressFormData,
        
        setRenderAddress,
        setRenderDescription,
        setPreview,
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
                    <AvatarImage 
                        src={user.photo} 
                        alt={user.name} 
                        className="object-cover w-full h-full rounded-full"
                    />
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
                <InputField label="Data de Nascimento" icon={<FontAwesomeIcon icon={faCalendar} />} value={user.birth_date?.toLocaleDateString() ?? ""} disabled />

                { type=="patient" && (
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <InputField label="Gênero" icon={""} value={user.gender ?? ""} disabled />
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

    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const getInitials = useInitials();

    const {
        preview,
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
        setErrorMessage("");
    }, [user]);

    const handleSave = async () => {
        if (!user || isSaving) return;

        setErrorMessage("");

        const validationErrors = validateUserData(formData, type, true, fileInputRef.current);
        
        if (validationErrors.length > 0) {
            setErrorMessage(validationErrors[0]);
            return;
        }

        setIsSaving(true);

        try {
            const submitFormData = new FormData();
            submitFormData.append('name', formData.name);
            submitFormData.append('email', formData.email);
            submitFormData.append('phone', formData.phone);
            submitFormData.append('_method', 'PUT');

            if (fileInputRef.current?.files?.[0]) {
                submitFormData.append('photo', fileInputRef.current.files[0]);
            }

            let updateUrl = '';
            switch (type) {
                case 'admin':
                    updateUrl = `/admin/admins/${user.id}`;
                    break;
                case 'doctor':
                    updateUrl = `/admin/doctors/${user.id}`;
                    break;
                case 'receptionist':
                    updateUrl = `/admin/receptionists/${user.id}`;
                    break;
                case 'patient':
                    updateUrl = `/admin/patients/${user.id}`;
                    break;
                default:
                    throw new Error('Tipo de usuário inválido');
            }

            // Pegar o token CSRF do meta tag
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            if (!csrfToken) {
                throw new Error('Token CSRF não encontrado');
            }

            const response = await fetch(updateUrl, {
                method: 'POST', 
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: submitFormData,
            });

            const contentType = response.headers.get('content-type');
            
            if (!response.ok) {
                if (response.status === 419) {
                    setErrorMessage('Sessão expirada. Recarregue a página e tente novamente.');
                    return;
                }
                
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || 'Erro ao atualizar usuário');
                } else {
                    setErrorMessage('Erro no servidor. Tente novamente.');
                }
                return;
            }

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                
                if (data.success) {
                    window.location.reload();
                } else {
                    setErrorMessage(data.message || 'Erro ao atualizar usuário');
                }
            } else {
                window.location.reload();
            }

        } catch (error) {
            console.error('Erro ao salvar:', error);
            if (error instanceof SyntaxError) {
                setErrorMessage('Erro de comunicação com o servidor. Sessão pode ter expirado.');
            } else {
                setErrorMessage('Erro ao salvar as alterações. Tente novamente.');
            }
        } finally {
            setIsSaving(false);
        }
    };

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
                    <AvatarImage 
                        src={preview} 
                        alt={user.name} 
                        className="object-cover w-full h-full rounded-full"
                    />
                            <AvatarFallback className="bg-[#9fa3ae63] text-2xl">
                                {getInitials(user.name)}
                            </AvatarFallback>
                </Avatar>
                <label className="bg-[#9fa3ae63] p-1 rounded cursor-pointer text-sm">
                    Editar Foto
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden" 
                    />
                </label>
            </div>

            <InputField label="Nome" icon={<FontAwesomeIcon icon={faUser} />} name="name" value={formData.name} onChange={handleChange} />
            <InputField label="E-mail" icon={<FontAwesomeIcon icon={faEnvelope} />} name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Telefone" icon={<FontAwesomeIcon icon={faPhone} />} name="phone" value={formData.phone} onChange={handleChange} />

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

            <InputError message={errorMessage} className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4" />

            <div className="w-full flex justify-center pt-4 gap-3">
                <button 
                    onClick={(type === "admin" || type === "doctor") ? handleSave : undefined}
                    disabled={(type === "admin" || type === "doctor") ? isSaving : false}
                    className={`text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer ${
                        (type === "admin" || type === "doctor") && isSaving 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-[#030D29] hover:bg-[#1C4F4A]'
                    }`}
                >
                    {(type === "admin" || type === "doctor") && isSaving ? 'Salvando...' : 'Salvar'}
                </button>
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
    const [isCreating, setIsCreating] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        preview,
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
        setErrorMessage("");
    }, []);

    const handleCreate = async () => {
        if (isCreating) return;
        
        setErrorMessage("");

        const validationErrors = validateUserData(formData, type, false, fileInputRef.current);
        
        if (validationErrors.length > 0) {
            setErrorMessage(validationErrors[0]);
            return;
        }

        setIsCreating(true);

        try {
            const submitFormData = new FormData();
            submitFormData.append('name', formData.name);
            submitFormData.append('email', formData.email);
            submitFormData.append('cpf', formData.cpf);
            submitFormData.append('phone', formData.phone);
            submitFormData.append('password', formData.password);
            submitFormData.append('birth_date', formData.birth_date);

            if (type === "admin") {
            submitFormData.append('is_master', formData.is_master);
        }

        if (type === "doctor") {
            submitFormData.append('crm', formData.crm);
        }

        if (type === "receptionist") {
            submitFormData.append('register_number', formData.register_number);
        }

        if (type === "patient") {
            submitFormData.append('gender', formData.gender);
            submitFormData.append('emergency_contact', formData.emergency_contact);
            submitFormData.append('medical_history', formData.medical_history);
        }

        if (fileInputRef.current?.files?.[0]) {
            submitFormData.append('photo', fileInputRef.current.files[0]);
        }

        let createUrl = '';
        switch (type) {
            case 'admin':
                createUrl = '/admin/admins';
                break;
            case 'doctor':
                createUrl = '/admin/doctors';
                break;
            case 'receptionist':
                createUrl = '/admin/receptionists';
                break;
            case 'patient':
                createUrl = '/admin/patients';
                break;
            default:
                throw new Error('Tipo de usuário inválido');
        }

        const response = await fetch(createUrl, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
            body: submitFormData,
        });

        const contentType = response.headers.get('content-type');
        
        if (!response.ok) {
            if (response.status === 419) {
                setErrorMessage('Sessão expirada. Recarregue a página e tente novamente.');
                return;
            }
            
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Erro ao criar usuário');
            } else {
                setErrorMessage('Erro no servidor. Tente novamente.');
            }
            return;
        }

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            
            if (data.success) {
                window.location.reload();
            } else {
                setErrorMessage(data.message || 'Erro ao criar usuário');
            }
        } else {
            window.location.reload();
        }

    } catch (error) {
        console.error('Erro ao criar:', error);
        if (error instanceof SyntaxError) {
            setErrorMessage('Erro de comunicação com o servidor. Sessão pode ter expirado.');
        } else {
            setErrorMessage('Erro ao criar usuário. Verifique os dados e tente novamente.');
        }
    } finally {
        setIsCreating(false);
    }
};

    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl ">
            <DialogHeader className="flex-shrink-0">
                <DialogTitle className="text-white text-center p-2">Criar {type === "admin" ? "Administrador" : type === "receptionist" ? "Recepcionista" : type === "doctor" ? "Doutor" : "Paciente"}</DialogTitle>
                <ModalAddress 
                    user={user} 
                    modalType='create'
                    address={user?.address || null} 
                />
                <DialogDescription className="max-h-[86vh] bg-white p-4 rounded-b-2xl space-y-4 text-[#030D29] overflow-y-auto flex-1 custom-scrollbar flex-col" style={{ display: renderDescription }}>

                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24 border-2 border-[#9FA3AE]">
                            <AvatarImage 
                                src={preview} 
                                alt="Preview" 
                                className="object-cover w-full h-full rounded-full"
                            />
                            <AvatarFallback className="bg-gray-200 text-gray-600 flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="text-3xl" />
                            </AvatarFallback>
                        </Avatar>       
                        <label className="bg-[#9fa3ae63] p-1 rounded cursor-pointer text-sm">
                            Adicionar Foto
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="hidden" 
                            />
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
                    <InputField name="birth_date" label="Data de Nascimento" icon={<FontAwesomeIcon icon={faCalendar} />} value={formData.birth_date} type="date" onChange={handleChange} />

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
                            </div>
                            <InputField name="emergency_contact" label="Contato de Emergência" icon={<FontAwesomeIcon icon={faCommentMedical} />} value={formData.emergency_contact} placeholder="Digite o contato de emergência" onChange={handleChange} />
                            <InputField name="medical_history" label="Histórico Médico" value={formData.medical_history} isTextArea={true} placeholder="Digite o histórico médico" onChange={handleChange} />
                        </div>
                    )}

                    {type === "doctor" && (
                        <div className="flex gap-3">
                            <InputField name="crm" label="CRM" icon={<FontAwesomeIcon icon={faIdCardClip} />} value={formData.crm} placeholder="Digite o CRM" onChange={handleChange} />
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
                                { label: "Selecione a opção", value: "" },
                                { label: "Sim", value: "yes" },
                                { label: "Não", value: "no" },
                            ]}
                            onChange={handleSelectChange}
                            value={is_master}
                        />
                    )}

                    <InputError message={errorMessage} className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4" />

                    <div className="w-full flex justify-center pt-4 gap-3">
                        <button 
                            onClick={type === "admin" ? handleCreate : undefined}
                            disabled={type === "admin" ? isCreating : false}
                            className={`text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer ${
                                type === "admin" && isCreating 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#030D29] hover:bg-[#1C4F4A]'
                            }`} 
                            style={{ display: type === "patient" ? "none" : "flex" }}
                        > 
                            {type === "admin" && isCreating ? "Criando..." : "Criar"}
                        </button>
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

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!user || isDeleting) return;

        setIsDeleting(true);

        try {
            // Determinar a rota correta baseada no tipo
            let deleteUrl = '';
            switch (type) {
                case 'admin':
                    deleteUrl = `/admin/admins/${user.id}`;
                    break;
                case 'doctor':
                    deleteUrl = `/admin/doctors/${user.id}`;
                    break;
                case 'receptionist':
                    deleteUrl = `/admin/receptionists/${user.id}`;
                    break;
                case 'patient':
                    deleteUrl = `/admin/patients/${user.id}`;
                    break;
                default:
                    throw new Error('Tipo de usuário inválido');
            }

            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            });

            const data = await response.json();

            if (data.success) {
                window.location.reload();
            } else {
                alert(data.message || 'Erro ao deletar usuário');
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);
            alert('Erro ao deletar usuário');
        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <DialogContent className="bg-[#030D29] p-0 pt-3 rounded-2xl overflow-y-auto">
        <DialogHeader>
            <DialogTitle className="text-white text-center p-2">Excluir {user ? user.name : type === "admin" ? "Administrador" : type === "receptionist" ? "Recepcionista" : type === "doctor" ? "Doutor" : "Paciente"}</DialogTitle>
            <DialogDescription className=" flex flex-col items-center text-base bg-white text-[#030D29] rounded-b-2xl space-y-4 p-7">
                <div className="text-center">
                    <p className="mb-2">Tem certeza que deseja excluir o usuário <strong>{user.name}</strong>?</p>
                    <p className="text-sm text-gray-600">Esta ação não pode ser desfeita.</p>
                </div>
                <div className="w-full flex justify-center bg-white p-3 rounded-b-2xl gap-3">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`text-white text-base px-5 py-1 rounded hover:scale-105 transition cursor-pointer ${
                            isDeleting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'
                        }`}
                    >
                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </button>
                    <DialogClose className="text-white text-base bg-[#030D29] px-5 py-1 rounded hover:scale-105 hover:bg-[#7A2E2E] transition cursor-pointer">
                        Cancelar
                    </DialogClose>
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