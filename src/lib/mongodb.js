// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri);

// export default client;



import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNamesObj = {
  servicesCollection: "test_services",
  userCollection: "users", 
};
    
export default function dbConnect(collectionName) {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  // Dynamically targets your database name and the requested collection
  return client.db(process.env.DB_NAME).collection(collectionName);
}
