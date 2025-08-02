import { ReactNode } from "react";

interface InputFieldProps {
    label: string;
    icon?: ReactNode;
    value: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isTextArea?: boolean;
    disabled?: boolean;
    placeholder?: string;
    type?: string; 
}

export function InputField({
    label,
    icon,
    value,
    name,
    onChange,
    placeholder,
    isTextArea = false,
    disabled = false,
    type,
    }: InputFieldProps) {
    return (
        <div className="flex flex-col w-full">
            <label className="font-bold">{label}</label>
            <div className="flex justify-center items-center bg-[#9fa3ae63] p-2 rounded-md gap-2 custom-scrollbar">
                {icon}
                {isTextArea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full focus:outline-none text-[#030D29]"
                    placeholder={placeholder}
                    rows={2}

                />
                ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full focus:outline-none text-[#030D29]"
                    placeholder={placeholder}
                />
                )}
            </div>
        </div>
    );
}
