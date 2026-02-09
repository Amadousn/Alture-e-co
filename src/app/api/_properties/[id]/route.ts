import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'public/data/propertydata.json');

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    let data = JSON.parse(fileContents);

    const index = data.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    data[index] = { ...data[index], ...body };
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json(data[index]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    let data = JSON.parse(fileContents);

    const filteredData = data.filter((p: any) => p.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(filteredData, null, 2));

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
