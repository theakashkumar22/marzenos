import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(); // default DB from URI
    const collection = db.collection("subscribers");

    await collection.insertOne({ email, createdAt: new Date() });
    await client.close();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
