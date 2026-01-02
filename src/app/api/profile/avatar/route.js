export async function POST(request) {
  try {
    const user = verifyToken(request);
    const formData = await request.formData();
    const file = formData.get("avatar");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    // Save file to /public/uploads/avatar-{userId}.png
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(process.cwd(), `public/uploads/avatar-${user.id}.png`);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: "Avatar uploaded",
      url: `/uploads/avatar-${user.id}.png`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 400 });
  }
}