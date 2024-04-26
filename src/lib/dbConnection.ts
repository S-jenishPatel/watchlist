import mongoose from "mongoose";

type TConnection = {
  isConnected?: number;
};

const connection: TConnection = {};

const dbConnect = async (): Promise<any> => {
  if (connection.isConnected == 1) {
    console.log("MongoDB already connected");
    return;
  }
  try {
    const connectInstance = await mongoose.connect(
      process.env.MONGODB_URL || ""
    );

    console.log(connection.isConnected);

    connection.isConnected = connectInstance.connections[0].readyState;

    console.log(connection.isConnected);
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default dbConnect;
