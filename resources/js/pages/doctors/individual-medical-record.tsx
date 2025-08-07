
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { faUser, faCalendar, faPhone, faIdCard, faStethoscope, faVenusMars, faHeart, faBirthdayCake, faCommentMedical, faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'Visualizar Prontuários',
        href: '/doctor/medical-record',
    },
    {
        title: 'Prontuário Individual',
        href: '#',
    },
];

interface Patient {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birth_date: string;
    gender: string;
    emergency_contact: string;
    medical_history: string;
    avatar?: string;
}

interface Consultation {
    id: number;
    date: string;
    type: string;
    diagnosis: string;
    symptoms: string;
    notes: string;
}

interface MedicalHistory {
    allergies: string[];
    medications: string[];
    conditions: string[];
    surgeries: string[];
}

export default function IndividualMedicalRecord({ 
    patient, 
    consultations = [], 
    medicalHistory = { allergies: [], medications: [], conditions: [], surgeries: [] } 
}: { 
    patient: Patient;
    consultations?: Consultation[];
    medicalHistory?: MedicalHistory;
}) {
    // Função para calcular a idade do paciente
    const calculateAge = (birthDate: string): number => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    const patientAge = calculateAge(patient.birth_date);

    return (
        <AppLayout breadcrumbs={breadcrumbs} userRole='doctor'>
            <Head title={`Prontuário do ${patient.name}`} />
            <div className="container mx-auto p-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#030D29]">Prontuário do Paciente</h1>
                    <p className="text-[#030D29]/70 mt-2 text-lg">{patient.name}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="flex flex-col h-full">
                        <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-[#030D29]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUser} className="text-[#030D29] text-3xl" />
                                </div>
                                <h2 className="text-xl font-bold text-[#030D29]">{patient.name}</h2>
                            </div>
                            <div className="space-y-4 flex-1">
                                <div className="flex items-center justify-between bg-[#030D29]/5 p-3 rounded-lg hover:bg-[#030D29]/10 transition-colors">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faBirthdayCake} className="text-[#030D29] mr-2" />
                                        <span className="font-medium text-[#030D29]">Idade</span>
                                    </div>
                                    <span className="text-[#030D29]/80 font-semibold">{patientAge} anos</span>
                                </div>

                                <div className="flex items-center justify-between bg-[#030D29]/5 p-3 rounded-lg hover:bg-[#030D29]/10 transition-colors">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faVenusMars} className="text-[#030D29] mr-2" />
                                        <span className="font-medium text-[#030D29]">Gênero</span>
                                    </div>
                                    <span className="text-[#030D29]/80 font-semibold">
                                        {patient.gender === 'male' ? 'Masculino' : 'Feminino'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between bg-[#030D29]/5 p-3 rounded-lg hover:bg-[#030D29]/10 transition-colors">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faPhone} className="text-[#030D29] mr-2" />
                                        <span className="font-medium text-[#030D29]">Telefone</span>
                                    </div>
                                    <span className="text-[#030D29]/80 font-semibold">{patient.phone}</span>
                                </div>

                                <div className="flex items-center justify-between bg-[#030D29]/5 p-3 rounded-lg hover:bg-[#030D29]/10 transition-colors">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faIdCard} className="text-[#030D29] mr-2" />
                                        <span className="font-medium text-[#030D29]">CPF</span>
                                    </div>
                                    <span className="text-[#030D29]/80 font-semibold">{patient.cpf}</span>
                                </div>

                                <div className="flex items-center justify-between bg-[#030D29]/5 p-3 rounded-lg hover:bg-[#030D29]/10 transition-colors">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faCommentMedical} className="text-[#030D29] mr-2" />
                                        <span className="font-medium text-[#030D29]">Contato de Emergência</span>
                                    </div>
                                    <span className="text-[#030D29]/80 font-semibold">
                                        {patient.emergency_contact}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-6">
                        {patient.medical_history && (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-lg font-bold text-[#030D29] mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faBookMedical} className="mr-2" />
                                    Histórico Médico Detalhado
                                </h3>
                                <div className="bg-[#030D29]/5 p-4 rounded-lg">
                                    <p className="text-[#030D29]/80 whitespace-pre-wrap leading-relaxed">{patient.medical_history}</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold text-[#030D29] mb-6 flex items-center">
                                <FontAwesomeIcon icon={faStethoscope} className="mr-2" />
                                Consultas Realizadas
                            </h3>
                            
                            <div className="space-y-4">
                                {consultations.length > 0 ? (
                                    consultations.map((consultation) => (
                                        <div key={consultation.id} className="bg-[#030D29]/5 rounded-lg p-4 hover:bg-[#030D29]/10 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-semibold text-[#030D29] text-lg">{consultation.type}</h4>
                                                <span className="text-sm text-[#030D29]/70 bg-[#030D29]/10 px-3 py-1 rounded-full font-medium">
                                                    {new Date(consultation.date).toLocaleDateString('pt-BR')}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-white p-3 rounded-lg">
                                                    <p className="text-sm font-medium text-[#030D29] mb-2">Sintomas:</p>
                                                    <p className="text-sm text-[#030D29]/80">{consultation.symptoms}</p>
                                                </div>
                                                <div className="bg-white p-3 rounded-lg">
                                                    <p className="text-sm font-medium text-[#030D29] mb-2">Diagnóstico:</p>
                                                    <p className="text-sm text-[#030D29]/80">{consultation.diagnosis}</p>
                                                </div>
                                                {consultation.notes && (
                                                    <div className="md:col-span-2 bg-white p-3 rounded-lg">
                                                        <p className="text-sm font-medium text-[#030D29] mb-2">Observações:</p>
                                                        <p className="text-sm text-[#030D29]/80">{consultation.notes}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 bg-[#030D29]/5 rounded-lg">
                                        <FontAwesomeIcon icon={faStethoscope} className="text-[#030D29]/40 text-4xl mb-4" />
                                        <h4 className="text-lg font-medium text-[#030D29] mb-2">Nenhuma consulta encontrada</h4>
                                        <p className="text-[#030D29]/60">Este paciente ainda não possui consultas registradas.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}