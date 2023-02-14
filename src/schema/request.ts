
import {
    buildSchema,
    Field,
    ID,
    ObjectType,
    Query,
    Resolver,
    
} from "type-graphql";

@ObjectType()
export class Request {
    @Field()
    createdByWho: string;

    @Field()
    isPending: boolean;

    @Field()
    department: string;

    @Field()
    id: string;

    @Field()
    timeoff: string;
}