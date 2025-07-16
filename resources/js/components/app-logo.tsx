

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <img src="logo.png" alt="Logo" className="h-9 w-9 mx-auto" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-lg">
                <span className="mb-0.5 truncate leading-tight font-semibold">MedSys</span>
            </div>
        </>
    );
}
