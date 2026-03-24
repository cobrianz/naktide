import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

import { getDb } from "@/lib/mongodb";

const SESSION_COOKIE = "naktide_session";

type UserRecord = {
  id: string;
  email: string;
  name: string;
  role: "traveler" | "admin";
  passwordHash: string;
};

type SessionRecord = {
  id: string;
  token: string;
  userId: string;
  role: "traveler" | "admin";
  createdAt: string;
};

function hashPassword(password: string) {
  const salt = randomUUID();
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");
  const derived = scryptSync(password, salt, 64);
  const original = Buffer.from(key, "hex");
  return timingSafeEqual(derived, original);
}

export async function createUserAccount(input: { name: string; email: string; password: string; role?: "traveler" | "admin" }) {
  const db = await getDb();
  const users = db.collection<UserRecord>("users");
  const email = input.email.trim().toLowerCase();
  const existing = await users.findOne({ email });
  if (existing) {
    throw new Error("An account with that email already exists.");
  }

  const user: UserRecord = {
    id: `user-${Date.now()}`,
    email,
    name: input.name.trim(),
    role: input.role ?? "traveler",
    passwordHash: hashPassword(input.password),
  };

  await users.insertOne(user);
  return user;
}

export async function authenticateUser(email: string, password: string) {
  const db = await getDb();
  const users = db.collection<UserRecord>("users");
  const user = await users.findOne({ email: email.trim().toLowerCase() });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new Error("Invalid email or password.");
  }
  return user;
}

export async function createSession(user: { id: string; role: "traveler" | "admin" }) {
  const db = await getDb();
  const sessions = db.collection<SessionRecord>("sessions");
  const token = randomUUID();
  const session: SessionRecord = {
    id: `session-${Date.now()}`,
    token,
    userId: user.id,
    role: user.role,
    createdAt: new Date().toISOString(),
  };
  await sessions.insertOne(session);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", secure: false });
  return session;
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getDb();
    await db.collection<SessionRecord>("sessions").deleteOne({ token });
  }
  store.delete(SESSION_COOKIE);
}

export async function getCurrentSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await getDb();
  return db.collection<SessionRecord>("sessions").findOne({ token });
}

export async function getCurrentUserRecord() {
  const session = await getCurrentSession();
  if (!session) return null;
  const db = await getDb();
  return db.collection<UserRecord>("users").findOne({ id: session.userId });
}

export { SESSION_COOKIE, hashPassword };
