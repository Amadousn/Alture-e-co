import Sidebar from "./components/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="mt-14 rounded-lg p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
