
import nodemailer from 'nodemailer';

import {
    Arg,
    buildSchema,
    Field,
    ID,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { Request } from "./request";
import { RequestModel } from "./RequestModel";
import { SessionModel } from "./sessionModel";
import { UserModel, UserSchema } from "./userModels";


import { User } from './users';

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "hrservice@oakstop.com",
        pass: "Oakstop2024"
    }
});


const nullUser: UserSchema = {
    email: "null",
    ssn: "null",
    department: "null",
    approver: false,
    admin: false,
    fullname: "null",
    classification: false,
    timeoff: "null"
}

const nullRequest: Request & { id:string } = {
    createdByWho: "null",
    department: "null",
    isPending: true,
    id: "null",
    timeoff: "null"
}


@Resolver(User)
export class UsersResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await UserModel.find()
        return users
    }
    @Query(() => [User])
    async verifiedUser(): Promise<User | null> {
        return nullUser
    }
    @Mutation(() => User || null)
    async authUser( @Arg( "ssn" ) @Arg( "email" ) email: string, ssn: string ): Promise<User | null> {
        const user = await UserModel.findOne({ email, ssn })
        if( !user ) return nullUser;
        return user
    }
    @Mutation(() => User || null)
    async verifyUser(  @Arg( "ssn" ) @Arg( "email" ) email: string, ssn: string ): Promise<User | null> {
        const session = await SessionModel.findOneAndDelete({ email, ssn });
        if(!session) return nullUser;
        const user = await UserModel.findOne({ email, ssn });
        if( !user ) return nullUser;
        return user
    }
    @Mutation(() => User || null)
    async updateUser( @Arg( "fullname" ) fullname: string, @Arg( "department" ) department: string, @Arg( "ssn" ) ssn: string, @Arg( "timeoff" ) timeoff: string, @Arg( "approver" ) approver: boolean,  @Arg( "admin" ) admin: boolean,  @Arg( "classification" ) classification: boolean, ): Promise<User | null> {
        
        const user = await UserModel.findOneAndUpdate({ fullname: fullname },{
            department: department, 
            ssn: ssn,
            timeoff: timeoff,
            approver: approver, 
            admin: admin, 
            classification: classification, 
        })
        if( !user ) return nullUser;
        return user
    }
    @Mutation(() => User || null)
    async addUser( @Arg( "fullname" ) fullname: string, @Arg( "department" ) department: string, @Arg( "ssn" ) ssn: string, @Arg( "timeoff" ) timeoff: string, @Arg( "approver" ) approver: boolean,  @Arg( "admin" ) admin: boolean,  @Arg( "classification" ) classification: boolean, @Arg( "email" ) email: string ): Promise<User | null> {
        const user = await UserModel.create({
            fullname: fullname,
            department: department, 
            ssn: ssn,
            timeoff: timeoff,
            approver: approver, 
            admin: admin, 
            classification: classification, 
            email: email
        })

        if( !user ) return nullUser;
        return user
    }
    @Mutation(() => User || null)
    async deleteUser(  @Arg( "email" ) email: string, ): Promise<User | null> {
        const user = await UserModel.findOneAndDelete({ email })
        if( !user ) return nullUser;
        return user
    }
    @Mutation(() => Request || null)
    async addRequest(  @Arg( "createdByWho" ) createdByWho: string, @Arg( "department" ) department: string,  @Arg( "timeoff" ) timeoff: string  ): Promise<Request | null> {
        const request = await RequestModel.create({ 
            department,
            createdByWho,
            isPending: true,
            timeoff
        }).catch((err) => console.log(err)) as Request

        const employee = await UserModel.findOne({ fullname: createdByWho }) as UserSchema | null;

        if(!employee) return nullRequest

        const details = {
            from: "hrservice@oakstop.com",
            to: "",
            subject: "",
            text: ""
        }

        const managers: UserSchema[] = await (await UserModel.find({ approver: true })).filter(( manager ) => manager.department !== department || "ALL"  )
        managers.forEach(( manager ) => {
            details.to = manager.email
            details.subject = `${employee.fullname} requested time off for ${request.timeoff}`;
            details.text = `${employee.fullname} requested time for ${request.timeoff}. Please use Oakstop's Time Off Management Web Application to approve or reject the request, Replying to this email will not approve or reject the request.`

            

            mailTransporter.sendMail( details, err => { 
                if(err) return nullRequest
            })
        })

       

        
        if( !request ) return nullRequest
        return request
    }
    @Mutation(() => Request || null)
    async updateRequest(  @Arg( "id" ) id: string, ): Promise<Request | null> {
        const request = await RequestModel.findByIdAndDelete(id) as Request
        if( !request ) return nullRequest

        const employee = await UserModel.findOne({ "fullname": request.createdByWho }) as UserSchema | null;



        if(!employee) return nullRequest

        const details = {
            from: "hrservice@oakstop.com",
            to: "",
            subject: "",
            text: ""
        }

        const managers: UserSchema[] = await (await UserModel.find({ approver: true })).filter(( manager ) => manager.department !== employee.department || "ALL"  )
        managers.forEach(( manager ) => {
            details.to = manager.email
            details.subject = `${employee.fullname} request time off for ${request.timeoff} was approved`;
            details.text = `${employee.fullname} time off request for ${request.timeoff} was approved.`

            

            mailTransporter.sendMail( details, err => { 
                if(err) return nullRequest
            })
        })

        details.from = "hrservice@oakstop.com",
        details.to = employee.email,
        details.subject = `Your request time off for ${request.timeoff} was approved`,
        details.text = `Your request time off for ${request.timeoff} was approved.`
        

        mailTransporter.sendMail( details, err => { 
            if(err) return nullRequest
        })

        return request
    }
    @Mutation(() => Request || null)
    async deleteRequest(  @Arg( "id" ) id: string, ): Promise<Request | null> {
        const request = await RequestModel.findByIdAndDelete(id) as Request
        if( !request ) return nullRequest

        const employee = await UserModel.findOne({ "fullname": request.createdByWho }) as UserSchema | null;



        if(!employee) return nullRequest

        const details = {
            from: "hrservice@oakstop.com",
            to: "",
            subject: "",
            text: ""
        }

        const managers: UserSchema[] = await (await UserModel.find({ approver: true })).filter(( manager ) => manager.department !== employee.department || "ALL"  )
        managers.forEach(( manager ) => {
            details.to = manager.email
            details.subject = `${employee.fullname} request time off for ${request.timeoff} was rejected`;
            details.text = `${employee.fullname} time off request for ${request.timeoff} was rejected.`

            

            mailTransporter.sendMail( details, err => { 
                if(err) return nullRequest
            })
        })

        console.log(employee.email)

        details.from = "hrservice@oakstop.com",
        details.to = employee.email,
        details.subject = `Your request time off for ${request.timeoff} was rejected`,
        details.text = `Your request time off for ${request.timeoff} was rejected.`
        

        mailTransporter.sendMail( details, err => { 
            if(err) return nullRequest
        })

        return request
    }
    @Query(() => [Request])
    async requests(): Promise<Request[]> {
        const request = await RequestModel.find()
        return request
    }
}


