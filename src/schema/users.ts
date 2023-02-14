
import {
    buildSchema,
    Field,
    ID,
    ObjectType,
    Query,
    Resolver,
    
} from "type-graphql";

@ObjectType()
export class User {
    @Field()
    email: string;

    @Field()
    fullname: string;

    @Field()
    ssn: string;

    @Field()
    admin: boolean;

    @Field()
    department: string;

    @Field()
    approver: boolean;

    @Field()
    timeoff: string;

    @Field()
    classification: boolean;
}