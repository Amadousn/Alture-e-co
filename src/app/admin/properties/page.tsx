import PropertiesClient from "./PropertiesClient";

import { getData } from "@/utils/data";

async function getProperties() {
    return getData();
}

export default async function PropertiesPage() {
    const properties = await getProperties();

    return <PropertiesClient initialData={properties} />;
}
