import PropertyForm from "../../components/PropertyForm";
import fs from 'fs';
import path from 'path';

async function getProperty(id: string) {
    // Reusing server-side read logic for initial edit data
    // In production this would be an API call or DB query
    try {
        const dataFilePath = path.join(process.cwd(), 'public/data/propertydata.json');
        const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
        const data = JSON.parse(jsonData);
        return data.find((p: any) => p.id === id);
    } catch (e) {
        return null;
    }
}

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const property = await getProperty(id);

    if (!property) {
        return <div>Property not found</div>;
    }

    return (
        <div className="mx-auto max-w-4xl">
            <PropertyForm initialData={property} isEdit={true} />
        </div>
    );
}
