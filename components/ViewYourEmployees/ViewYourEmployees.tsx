

import { client } from '@/pages/_app'
import { GetUsersDocument, VerifiedUserDocument } from '@/src/generated/graphql'
import { UserSchema } from '@/src/schema/userModels'
import React from 'react'

import Employee from '../Employee/Employee';



type formType = UserSchema

export default function ViewYourEmployees() {


  const { users } = client.readQuery({ query: GetUsersDocument }) as { users: UserSchema[] }
  const authedUser = client.readQuery({
    query: VerifiedUserDocument
  }) as { verifiedUser: UserSchema | null }

  const departmentChecker = ( ) => {
    if( authedUser.verifiedUser?.department === "ALL" ) return users
    return users.filter(( user ) => 
    user.department === authedUser.verifiedUser?.department 
    && user.fullname !== authedUser?.verifiedUser.fullname 
    )
  }


  return (
    <div>
        {
          users && authedUser ?
           departmentChecker()
           .map(( user, i ) => {
            return <div key={i}>
              <Employee user={user} addingNewEmployee={false} />
              <br/>
              __________________________
              <br/><br/>
            </div>
        }) : null
        }
    </div>
  )
}

