import fs from 'fs';
import path from 'path';

export const dataFilePath = path.join(process.cwd(), 'public/data/propertydata.json');

export function getData() {
    // Ensure we are in a node environment (server-side)
    if (typeof window !== 'undefined') {
        throw new Error('getData can only be called on the server');
    }

    try {
        const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
        const data = JSON.parse(jsonData);

        // Migration logic: Ensure property_images exists
        return data.map((item: any) => {
            // If property_images doesn't exist but property_img does, create array
            if (!item.property_images && item.property_img) {
                item.property_images = [item.property_img];
            }
            // If neither exists, initialize empty array
            if (!item.property_images) {
                item.property_images = [];
            }
            // Ensure primary_image_index exists
            if (typeof item.primary_image_index === 'undefined') {
                item.primary_image_index = 0;
            }
            // Ensure property_img (backward compatibility) matches primary image
            if (item.property_images.length > 0) {
                item.property_img = item.property_images[item.primary_image_index || 0];
            }
            // Force SELL mode
            item.tag = "Sell";

            return item;
        });
    } catch (error) {
        console.error("Error reading data file:", error);
        return [];
    }
}

export function saveData(data: any) {
    if (typeof window !== 'undefined') {
        throw new Error('saveData can only be called on the server');
    }
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing data file:", error);
        return false;
    }
}
