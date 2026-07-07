// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri);

// export default client;



import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNamesObj = {
  servicesCollection: "test_services",
  userCollection: "users",
  heroBannerCollection: "hero_banners",
  productsCollection: "products",
};

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  global._mongoClientPromise = client.connect();
}

// reusable connection
clientPromise = global._mongoClientPromise;


export default async function dbConnect(collectionName) {
  const client = await clientPromise;
  return client.db(dbName).collection(collectionName);
}
