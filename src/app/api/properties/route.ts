import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'public/data/propertydata.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);

    const maxId = data.length > 0 ? Math.max(...data.map((p: any) => Number(p.id) || 0)) : 0;
    const newProperty = {
      ...body,
      id: (maxId + 1).toString(),
    };

    data.push(newProperty);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json(newProperty);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
