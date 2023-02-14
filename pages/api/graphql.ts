
import "reflect-metadata";
import dotenv from 'dotenv'

dotenv.config()



import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";

import {
    buildSchema,
    Field,
    ID,
    ObjectType,
    Query,
} from "type-graphql";
import { UsersResolver } from "@/src/schema/users.resolvers";
import mongoose from "mongoose";


const schema = await buildSchema({
    resolvers: [UsersResolver]
})

const server = new  ApolloServer({
    schema,
});

export const config = {
    api: {
        bodyParser: false,
    }
};

const startServer = server.start();

mongoose.connect(`mongodb+srv://hroakstop:hroakstop2023@cluster0.xu6m5cb.mongodb.net/?retryWrites=true&w=majority`, async () => {
    console.log("connecting to DB")
})



export default async function handler( req: MicroRequest, res: ServerResponse ) {


  
    await startServer;
    await server.createHandler({  
        path: "/api/graphql"
    })( req, res ).then(() => {
       
    })
   
}

// to generate code from new resolvers and schemas 
// yarn run generate