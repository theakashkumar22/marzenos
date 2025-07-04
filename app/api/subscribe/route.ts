export async function POST(req: NextRequest) {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("[DEBUG] Missing MONGODB_URI");
      return NextResponse.json({ error: "Missing database URI" }, { status: 500 });
    }

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const collection = db.collection("subscribers");

    await collection.insertOne({ email, createdAt: new Date() });
    await client.close();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
