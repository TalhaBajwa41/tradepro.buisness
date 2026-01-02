import { NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import fs from "fs";
import path from "path";

// GET /api/profile
export async function GET(request) {
  try {
    const user = verifyToken(request);

    const [profile] = await db.query(
      `SELECT id, first_name as firstName, last_name as lastName, email, bio
       FROM users WHERE id = ?`,
      [user.id]
    );

    return NextResponse.json(profile);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// PUT /api/profile
export async function PUT(request) {
  try {
    const user = verifyToken(request);
    const body = await request.json();

    if (!body.firstName || !body.lastName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await db.query(
      `UPDATE users SET first_name=?, last_name=?, bio=? WHERE id=?`,
      [body.firstName, body.lastName, body.bio || "", user.id]
    );

    return NextResponse.json({ message: "Profile updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}