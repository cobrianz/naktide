import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "naktide";

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

type GlobalMongo = typeof globalThis & {
  _naktideMongoClientPromise?: Promise<MongoClient>;
};

const globalForMongo = globalThis as GlobalMongo;

const clientPromise = globalForMongo._naktideMongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo._naktideMongoClientPromise = clientPromise;
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}
