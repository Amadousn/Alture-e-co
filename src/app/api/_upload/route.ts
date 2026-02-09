import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

  try {
    const uploadDir = path.join(process.cwd(), "public/images/properties");
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(
      path.join(uploadDir, filename),
      buffer
    );
    return NextResponse.json({ url: `/images/properties/${filename}` });
  } catch (error) {

    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
