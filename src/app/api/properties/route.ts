import { NextResponse } from 'next/server';
import { getData, saveData } from '@/utils/data';

export async function GET() {
    try {
        const data = getData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newItem = await request.json();
        const data = getData();
        newItem.id = Date.now().toString(); // Simple ID generation

        // Generate slug from title
        const slug = newItem.property_title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        newItem.slug = slug;

        // Ensure image structure
        if (!newItem.property_images) {
            newItem.property_images = newItem.property_img ? [newItem.property_img] : [];
        }
        newItem.primary_image_index = 0;

        // Force Sell tag
        newItem.tag = "Sell";

        data.push(newItem);
        saveData(data);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }
}
