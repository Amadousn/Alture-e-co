import { NextResponse } from 'next/server';
import { getData, saveData } from '@/utils/data';

interface Context {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: Request, context: Context) {
    const params = await context.params;
    const { id } = params;
    const data = getData();
    const property = data.find((p: any) => p.id === id);

    if (property) {
        return NextResponse.json(property);
    }
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
}

export async function PUT(request: Request, context: Context) {
    const params = await context.params;
    const { id } = params;
    try {
        const updates = await request.json();
        const data = getData();
        const index = data.findIndex((item: any) => item.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        // Ensure array structure if not present in updates
        if (!updates.property_images && updates.property_img) {
            updates.property_images = [updates.property_img];
        }

        // Update fields
        data[index] = { ...data[index], ...updates };

        // Update slug if title changed
        if (updates.property_title) {
            updates.slug = updates.property_title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        // Force SELL mode
        data[index].tag = "Sell";

        saveData(data);
        return NextResponse.json(data[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: Context) {
    const params = await context.params;
    const { id } = params;
    try {
        const data = getData();
        const filteredData = data.filter((item: any) => item.id !== id);

        if (data.length === filteredData.length) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        saveData(filteredData);
        return NextResponse.json({ message: 'Property deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
    }
}
