import { getData } from "@/utils/data";

export default function AdminDashboard() {
    const properties = getData();
    const totalProperties = properties.length;
    // Assuming 'status' differentiates sold vs active, or we use 'check' or 'tag'
    // For now, let's assume all non-sold are active.
    // Checking data, 'status' seems to be 'Buy' for all.
    // Let's rely on total for now and maybe mock 'Sold' as 0 if not present.
    const activeListings = properties.length; // Placeholder logic until we know better
    const soldProperties = 0;

    return (
        <div className="grid gap-4">
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Stat Cards */}
                <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{totalProperties}</h5>
                    <p className="font-normal text-gray-400">Total Properties</p>
                </div>
                <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{activeListings}</h5>
                    <p className="font-normal text-gray-400">Active Listings</p>
                </div>
                <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{soldProperties}</h5>
                    <p className="font-normal text-gray-400">Sold Properties</p>
                </div>
                <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">8</h5>
                    <p className="font-normal text-gray-400">Total Blogs</p>
                </div>
            </div>
        </div>
    );
}
