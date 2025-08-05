import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputField } from '@/components/input-field';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { faUser, faCalendar, faPhone, faIdCard, faCommentMedical, faClipboard, faStethoscope, faClock, faMoneyBill, faCheckCircle, faCircleDot, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectField } from '@/components/select-field';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'Iniciar Atendimento',
        href: '/doctors/start-consultation',
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

interface Appointment {
    id: number;
    appointment_date: string;
    status: string;
    value: number;
    patient: Patient;
}

interface ConsultationData {
    symptoms: string;
    diagnosis: string;
    notes: string;
}

interface StartConsultationProps {
    appointments: Appointment[];
    patients: Patient[];
}

const thisAppointments: Appointment[] = [
    {
        id: 1,
        appointment_date: '2023-10-01T10:00:00Z',
        status: 'scheduled',
        value: 150.00,
        patient: {
            id: 1,
            name: 'João Silva',
            email: 'joao.silva@example.com',
            cpf: '123.456.789-00',
            phone: '(11) 98765-4321',
            birth_date: '1990-01-01',
            gender: 'masculino',
            emergency_contact: '(11) 91234-5678',
            medical_history: 'Hipertensão',
            avatar: 'https://ui-avatars.com/api/?name=João+Silva',
        },
    },
    {
        id: 2,
        appointment_date: '2023-10-01T11:00:00Z',
        status: 'scheduled',
        value: 200.00,
        patient: {
            id: 2,
            name: 'Maria Oliveira',
            email: 'maria.oliveira@example.com',
            cpf: '987.654.321-00',
            phone: '(11) 91234-5678',
            birth_date: '1995-05-05',
            gender: 'feminino',
            emergency_contact: '(11) 99876-5432',
            medical_history: 'Diabetes',
            avatar: 'https://ui-avatars.com/api/?name=Maria+Oliveira',
        },
    },
];

const thisPatients: Patient[] = [
    {
        id: 1,
        name: 'João Silva',
        email: 'joao@email.com',
        cpf: '123.456.789-00',
        phone: '(11) 98765-4321',
        birth_date: '1990-01-01',
        gender: 'masculino',
        emergency_contact: '(11) 91234-5678',
        medical_history: 'Hipertensão',
        avatar: 'https://ui-avatars.com/api/?name=João+Silva',
    },
    {
        id: 2,
        name: 'Maria Oliveira',
        email: 'maria@email.com',
        cpf: '987.654.321-00',
        phone: '(11) 91234-5678',
        birth_date: '1995-05-05',
        gender: 'feminino',
        emergency_contact: '(11) 99876-5432',
        medical_history: 'Diabetes',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Oliveira',
    },
];

function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className="text-center space-y-6">
            <div className="relative">
                <div className="text-5xl font-mono font-bold text-[#030D29] bg-white/90 p-6 rounded-2xl shadow-lg border-2 border-[#030d2934]">
                    {formatTime(time)}
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <Button 
                    onClick={handleStart} 
                    disabled={isRunning}
                    className="text-white disabled:opacity-50 h-12 text-base font-semibold shadow-lg hover:opacity-90 transition-all duration-300 cursor-pointer"
                    style={{ backgroundColor: '#030D29' }}
                >
                    {isRunning ? 'Em Andamento' : 'Iniciar'}
                </Button>
                <div className="flex gap-2">
                    <Button 
                        onClick={handlePause} 
                        disabled={!isRunning}
                        variant="outline"
                        className="flex-1 border-2 border-[#030D29] text-[#030D29] hover:bg-[#F7F2EB] disabled:opacity-50 cursor-po1"
                    >
                        Pausar
                    </Button>
                    <Button 
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1 border-2 border-[#030D29] text-[#030D29] hover:bg-[#F7F2EB] cursor-pointer"
                    >
                        Resetar
                    </Button>
                </div>
            </div>
        </div>
    );
}

    export default function StartConsultation({ appointments = thisAppointments, patients = thisPatients }: StartConsultationProps) {
    const [selectedPatient, setSelectedPatient] = useState<string>('');
    const [selectedAppointment, setSelectedAppointment] = useState<string>('');
    const [step, setStep] = useState(1);
    const getInitials = useInitials();

    const selectedPatientData = patients.find(p => p.id === parseInt(selectedPatient));
    const selectedAppointmentData = appointments.find(a => a.id === parseInt(selectedAppointment));

    return (
        <AppLayout breadcrumbs={breadcrumbs} userRole="doctor">
            <Head title="Iniciar Atendimento" />
            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {step === 1 && (
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#030D29] rounded-full mb-4">
                                <FontAwesomeIcon icon={faStethoscope} className="text-white text-2xl" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">Iniciar Atendimento</h1>
                            <p className="text-xl text-gray-600">Selecione o paciente e o agendamento para começar a consulta</p>
                        
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border h-full" style={{ backgroundColor: '#F7F2EB' }}>
                                    <div className='flex flex-col justify-center'>
                                        <div className='flex p-3 pl-4 rounded-t-xl' style={{ backgroundColor: '#030D29' }}>
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                                                <p className='text-xl text-white font-bold'>Selecionar Paciente</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col h-full justify-start items-center p-6'>
                                            <div className='w-full mb-4'>
                                                <SelectField
                                                    name="patient"
                                                    value={selectedPatient}
                                                    label="Selecione um paciente"
                                                    options={[
                                                        { value: '', label: 'Selecione um paciente' },
                                                        ...patients.map((patient) => ({
                                                            value: String(patient.id),
                                                            label: patient.name,
                                                        }))
                                                    ]}
                                                    onChange={(e) => setSelectedPatient(e.target.value)}
                                                />
                                            </div>

                                            {selectedPatientData && (
                                                <div className="w-full p-6 border border-[#030d2934] rounded-lg bg-white/50">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <Avatar className="h-16 w-16 ring-4 ring-[#030D29]">
                                                            <AvatarImage src={selectedPatientData.avatar} alt={selectedPatientData.name} />
                                                            <AvatarFallback className="bg-[#030D29] text-white text-lg font-bold">
                                                                {getInitials(selectedPatientData.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col w-full items-start">
                                                            <h3 className="text-xl font-bold text-[#030D29]">{selectedPatientData.name}</h3>
                                                            <p className="text-gray-600">{selectedPatientData.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex text-sm w-full items-center justify-between">
                                                        <div className="flex items-center gap-2 w-fit">
                                                            <FontAwesomeIcon icon={faIdCard} className="text-[#030D29]" />
                                                            <span><strong>CPF:</strong> {selectedPatientData.cpf}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 w-fit">
                                                            <FontAwesomeIcon icon={faPhone} className="text-[#030D29]" />
                                                            <span> <strong>Telefone:</strong> {selectedPatientData.phone}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 w-fit">
                                                            <FontAwesomeIcon icon={faVenusMars} className="text-[#030D29]" />
                                                            <span><strong>Gênero:</strong> {selectedPatientData.gender == 'masculino' ? 'Masculino' : 'Feminino'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                </div>
                            </div>

                            <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border h-full" style={{ backgroundColor: '#F7F2EB' }}>
                                <div className='flex flex-col justify-center'>
                                    <div className='flex p-3 pl-4 rounded-t-xl' style={{ backgroundColor: '#030D29' }}>
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faCalendar} className="text-white text-lg" />
                                            <p className='text-xl text-white font-bold'>Selecionar Agendamento</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col h-full justify-start items-center p-6'>
                                        <div className='w-full mb-4'>
                                            <SelectField
                                                name="appointment"
                                                value={selectedAppointment}
                                                label={selectedPatient ? "Selecione um agendamento" : "Primeiro selecione um paciente"}
                                                options={[
                                                    { value: '', label: selectedPatient ? 'Selecione um agendamento' : 'Primeiro selecione um paciente' },
                                                    ...appointments
                                                        .filter(apt => selectedPatient ? apt.patient.id === parseInt(selectedPatient) : true)
                                                        .map((appointment) => ({
                                                            value: String(appointment.id),
                                                            label: `${new Date(appointment.appointment_date).toLocaleString('pt-BR')} - ${appointment.status}`,
                                                        }))
                                                ]}
                                                onChange={(e) => setSelectedAppointment(e.target.value)}
                                            />
                                        </div>

                                        {selectedAppointmentData && (
                                            <div className="w-full p-6 border border-[#030d2934] rounded-lg bg-white/50">
                                                <h3 className="text-lg font-bold text-[#030D29] mb-4 flex items-center gap-2">
                                                    Detalhes do Agendamento
                                                </h3>
                                                <div className="space-y-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faClock} className="text-[#030D29]" />
                                                        <span><strong>Data/Hora:</strong> {new Date(selectedAppointmentData.appointment_date).toLocaleString('pt-BR')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faCircleDot} className="text-[#030D29]" />
                                                        <span><strong>Status:</strong> {selectedAppointmentData.status === 'completed' ? 'Concluído' : 'Agendado'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faMoneyBill} className="text-[#030D29]" />
                                                        <span><strong>Valor:</strong> R$ {selectedAppointmentData.value.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="w-full mt-6">
                                            <Button 
                                                onClick={() => setStep(2)}
                                                disabled={!selectedPatient || !selectedAppointment}
                                                className="w-full h-14 text-lg font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-300 cursor-pointer"
                                                style={{ backgroundColor: '#030D29' }}
                                            >
                                                Iniciar Consulta
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}

                    {step === 2 && selectedPatientData && selectedAppointmentData && (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-[#030D29]">Consulta em Andamento</h2>
                                </div>
                                <Button 
                                    onClick={() => setStep(1)}
                                    variant="outline"
                                    className="border-2 text-[#030D29] hover:bg-[#F7F2EB]"
                                    style={{ borderColor: '#030D29' }}
                                >
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    Voltar
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                
                                <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" style={{ backgroundColor: '#F7F2EB' }}>
                                    <div className='flex p-3 pl-4 rounded-t-xl' style={{ backgroundColor: '#030D29' }}>
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faClock} className="text-white text-lg" />
                                            <p className='text-xl text-white font-bold'>Tempo Decorrido</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <Timer />
                                    </div>
                                </div>

                                <div className="lg:col-span-2 flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" style={{ backgroundColor: '#F7F2EB' }}>
                                    <div className='flex p-3 pl-4 rounded-t-xl' style={{ backgroundColor: '#030D29' }}>
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                                            <p className='text-xl text-white font-bold'>Dados do Paciente</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-6 mb-6">
                                            <Avatar className="h-20 w-20 ring-4 ring-[#030D29]">
                                                <AvatarImage src={selectedPatientData.avatar} alt={selectedPatientData.name} />
                                                <AvatarFallback className="text-white text-xl font-bold" style={{ backgroundColor: '#030D29' }}>
                                                    {getInitials(selectedPatientData.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-bold text-[#030D29]">{selectedPatientData.name}</h2>
                                                <p className="text-gray-600 text-lg">{selectedPatientData.email}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Consulta: {new Date(selectedAppointmentData.appointment_date).toLocaleString('pt-BR')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-white/70 p-4 rounded-lg border border-[#030d2934]">
                                                <strong className="text-[#030D29] block">CPF</strong>
                                                <p className="text-gray-800">{selectedPatientData.cpf}</p>
                                            </div>
                                            <div className="bg-white/70 p-4 rounded-lg border border-[#030d2934]">
                                                <strong className="text-[#030D29] block">Telefone</strong>
                                                <p className="text-gray-800">{selectedPatientData.phone}</p>
                                            </div>
                                            <div className="bg-white/70 p-4 rounded-lg border border-[#030d2934]">
                                                <strong className="text-[#030D29] block">Gênero</strong>
                                                <p className="text-gray-800">{selectedPatientData.gender}</p>
                                            </div>
                                            <div className="bg-white/70 p-4 rounded-lg border border-[#030d2934]">
                                                <strong className="text-[#030D29] block">Nascimento</strong>
                                                <p className="text-gray-800">{new Date(selectedPatientData.birth_date).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                            <div className="col-span-2 bg-white/70 p-4 rounded-lg border border-[#030d2934]">
                                                <strong className="text-[#030D29] block">Contato de Emergência</strong>
                                                <p className="text-gray-800">{selectedPatientData.emergency_contact}</p>
                                            </div>
                                            <div className="col-span-2 bg-white/70 p-4 rounded-lg border border-[#030d2934]">
                                                <strong className="text-[#030D29] block">Histórico Médico</strong>
                                                <p className="text-gray-800 max-h-20 overflow-y-auto">{selectedPatientData.medical_history}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" style={{ backgroundColor: '#F7F2EB' }}>
                                <div className='flex p-3 pl-4 rounded-t-xl' style={{ backgroundColor: '#030D29' }}>
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faClipboard} className="text-white text-lg" />
                                        <p className='text-xl text-white font-bold'>Registro da Consulta</p>
                                    </div>
                                </div>
                                <div className="p-8 space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-lg font-semibold text-[#030D29] flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#030D29' }}></span>
                                                Sintomas
                                            </Label>
                                            <textarea
                                                placeholder="Descreva os sintomas relatados pelo paciente..."
                                                className="w-full min-h-[120px] p-4 border-2 border-[#030d2934] rounded-lg focus:border-[#030D29] focus:ring-2 focus:ring-[#030d2920] transition-all duration-200 resize-none bg-white/70"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-lg font-semibold text-[#030D29] flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#030D29' }}></span>
                                                Diagnóstico
                                            </Label>
                                            <textarea
                                                placeholder="Informe o diagnóstico ou suspeita diagnóstica..."
                                                className="w-full min-h-[120px] p-4 border-2 border-[#030d2934] rounded-lg focus:border-[#030D29] focus:ring-2 focus:ring-[#030d2920] transition-all duration-200 resize-none bg-white/70"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-lg font-semibold text-[#030D29] flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#030D29' }}></span>
                                            Notas e Observações
                                        </Label>
                                        <textarea
                                            placeholder="Adicione observações adicionais, prescrições, orientações, etc..."
                                            className="w-full min-h-[150px] p-4 border-2 border-[#030d2934] rounded-lg focus:border-[#030D29] focus:ring-2 focus:ring-[#030d2920] transition-all duration-200 resize-none bg-white/70"
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-6">
                                        <Button 
                                            className="flex-1 h-14 text-lg font-semibold text-white hover:opacity-90 transition-all duration-300 cursor-pointer"
                                            style={{ backgroundColor: '#030D29' }}
                                        >
                                            <FontAwesomeIcon icon={faClipboard} className="mr-3" />
                                            Finalizar Consulta
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

