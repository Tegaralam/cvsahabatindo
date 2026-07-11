import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  
  if (!file) {
    return new NextResponse('Missing file parameter', { status: 400 });
  }

  // Adding .pdf extension here so the URL doesn't need to expose it
  const filePath = path.join(process.cwd(), 'public', 'pdf', `${file}.pdf`);
  
  try {
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${file}.pdf"`,
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}
