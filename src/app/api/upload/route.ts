import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = file.name.split('.').pop();
    
    // Create a unique filename
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path where the file will be saved
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);
    
    // Write the file to the server
    await writeFile(filePath, buffer);
    
    // Return the URL to the uploaded file
    const fileUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      url: fileUrl,
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
