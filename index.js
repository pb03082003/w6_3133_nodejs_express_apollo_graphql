const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express'); // Import Apollo Server
const typeDefs = require('./schema'); // Import your GraphQL schema
const resolvers = require('./resolvers'); // Import your resolvers
const dotenv = require('dotenv');
dotenv.config();

// Connect to Local MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Successfully connected to local MongoDB');
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
  }
};

// Start Apollo Server
async function startServer() {
  const app = express();
  app.use(express.json());
  app.use('*', cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    connectDB();
  });
}

startServer();
