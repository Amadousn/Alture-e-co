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
    console.log(`[API DELETE] Received request for ID: ${id}`);

    try {
        const data = getData();
        console.log(`[API DELETE] Current Data Length: ${data.length}`);

        const filteredData = data.filter((item: any) => String(item.id) !== id);
        console.log(`[API DELETE] Filtered Data Length: ${filteredData.length}`);

        if (data.length === filteredData.length) {
            console.log(`[API DELETE] ID not found: ${id}`);
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        const saved = saveData(filteredData);
        if (saved) {
            console.log(`[API DELETE] Successfully saved changes.`);
            return NextResponse.json({ message: 'Property deleted successfully' });
        } else {
            console.error(`[API DELETE] Failed to save data.`);
            return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
        }
    } catch (error) {
        console.error(`[API DELETE] Exception:`, error);
        return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
    }
}
