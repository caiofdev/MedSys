type DashboardProfileProps = {
    userName: string,
    imgPath: string,
    type: string
};

export default function DashboardProfile( { userName, imgPath, type}: DashboardProfileProps ) {
    return (
        <div className="flex flex-col col-span-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" style={{ backgroundColor: '#F7F2EB' }}>
            <div className='flex flex-col h-full'>
                <div className='flex p-2 pl-3 rounded-xl' style={{ backgroundColor: '#030D29' }}>
                    <p className='text-xl text-white font-bold'>Meu Perfil</p>
                </div>
                <div className='flex flex-row justify-start items-center h-full'>
                    <div className='flex p-5 w-fit'>
                        <img src={imgPath} className="object-contain rounded-full h-20 p-0 m-0"/>
                    </div>
                    <div className='flex flex-col w-fit justify-self-start gap-0'>
                        <p className='font-bold text-xl'>{userName}</p>
                        <p>{type}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}