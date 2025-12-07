import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'public/data/pagedata.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // Validate body structure? For now assume it's the full JSON object or a part of it.
    // Let's assume we receive the full updated JSON or merge it.
    // For simplicity, let's say we receive { searchOptions: { category: [...] } } or similar
    
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    let data = JSON.parse(fileContents);

    // Merge logic
    const newData = { ...data, ...body };
    
    fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));

    return NextResponse.json(newData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
