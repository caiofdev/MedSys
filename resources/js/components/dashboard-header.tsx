import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocalDateTime from "./local-date-time";

type DashboardHeaderProps = {
    userName: string;
    imgPath: string;
};

export default function DashboardHeader({ userName, imgPath }: DashboardHeaderProps) {
    return(
        <div className="flex flex-row col-span-2 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border h-50 pl-2 pr-2 justify-between" style={{ backgroundColor: '#030D29', border:'none' }}>
            <div className='flex flex-col gap-2 justify-between h-full p-6'>
                <div className="flex flex-row items-center text-sm text-blue-50 w-[fit-content] p-1 pr-2 pl-2 rounded-xl " style={{ backgroundColor: '#2B3141'}}>
                    <FontAwesomeIcon icon={faCalendar} className="mr-2"/>
                    <LocalDateTime />
                </div>
                <div>
                    <div className="text-white text-3xl font-bold p-0 m-0">
                        Bem Vindo, {userName}!
                    </div>
                    <div className="text-white text-l p-0 m-0 font-light">
                        Tenha um ótimo dia!
                    </div>
                </div>
            </div>
            <div className="flex h-full mb-0 mt-2">
                <img src={imgPath} className='object-contain justify-end'/>
            </div>
        </div>
    );
}