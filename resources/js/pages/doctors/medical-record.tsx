import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { faUser, faCalendar, faPhone, faIdCard, faStethoscope, faVenusMars, faEye } from '@fortawesome/free-solid-svg-icons';
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

interface Doctor {
    id: number;
    name: string;
    email: string;
    crm: string;
    phone: string;
    specialty: string;
    avatar?: string;
}

interface Appointment {
    id: number;
    appointment_date: string;
    status: string;
    value: number | string;
    patient: Patient;
}

interface ConsultationData {
    id: number;
    appointment: Appointment;
    symptoms: string;
    diagnosis: string;
    notes: string;
}

interface MedicalRecordProps {
    patients: Patient[];
    doctor: Doctor;
    consultationData: ConsultationData[];
    userRole: string;
}


export default function MedicalRecordList({ patients, doctor, consultationData, userRole }: MedicalRecordProps) {

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

    const getLastConsultationForPatient = (patientId: number): ConsultationData | null => {
        const patientConsultations = consultationData.filter(
            consultation => consultation.appointment.patient.id === patientId
        );
        
        if (patientConsultations.length === 0) {
            return null;
        }
        
        const sortedConsultations = patientConsultations.sort((a, b) => {
            return new Date(b.appointment.appointment_date).getTime() - new Date(a.appointment.appointment_date).getTime();
        });
        
        return sortedConsultations[0];
    };

    const formatConsultationDate = (consultation: ConsultationData | null): string => {
        if (!consultation) {
            return 'Nenhuma consulta registrada';
        }
        
        return new Date(consultation.appointment.appointment_date).toLocaleDateString('pt-BR');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} userRole='doctor'>
            <Head title="Visualizar Prontuários" />
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-6">Visualizar Prontuários</h1>
                    
                    {patients.length === 0 ? (
                        <div className="text-center py-12">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 text-6xl mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente encontrado</h3>
                            <p className="text-gray-500">Não há pacientes cadastrados no sistema.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full gap-3">
                            {patients.map((patient) => {
                                const lastConsultation = getLastConsultationForPatient(patient.id);
                                const patientAge = calculateAge(patient.birth_date);
                                
                                return (
                                    <div key={patient.id} className="bg-[#F7F2EB] shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-200">
                                        <div className="mb-4 flex justify-between items-center">
                                            <div className="flex items-center w-fit">
                                                <FontAwesomeIcon icon={faUser} className="text-[#030D29] mr-2" />
                                                <span className="font-semibold text-lg">{patient.name}</span>
                                            </div>
                                            <div className="flex items-center w-fit">
                                                <FontAwesomeIcon icon={faVenusMars} className="text-gray-600 mr-2" />
                                                <span className="text-gray-700">{patient.gender === 'male' ? 'Masculino' : 'Feminino'}, {patientAge} anos</span>
                                            </div>
                                        </div>
                                        <div className="border-t pt-4 flex justify-between">
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={faCalendar} className="text-[#030D29] mr-2" />
                                                <span className="text-sm">
                                                    Última consulta: {formatConsultationDate(lastConsultation)}
                                                </span>
                                            </div>
                                            <Link 
                                                href={`/doctor/medical-record/${patient.id}`}
                                                className="flex items-center pl-2 pr-2 pt-1 pb-1 rounded-md bg-[#030D29] text-[#F7F2EB] gap-2 hover:bg-[#030D29e1] hover:scale-102 transition-colors duration-200 cursor-pointer"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                                <span className="text-base font-bold">Visualizar Prontuário</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
        </AppLayout>
    );
}