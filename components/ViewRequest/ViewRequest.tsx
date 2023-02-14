

import { client } from '@/pages/_app'
import { AddRequestDocument, DeleteRequestDocument, GetUsersDocument, RequestsDocument, UpdateRequestDocument, VerifiedUserDocument } from '@/src/generated/graphql'
import { UserSchema } from '@/src/schema/userModels'
import React, { useState } from 'react'

import { TextField, Checkbox, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { RequestSchema } from '@/src/schema/RequestModel'
import Request from '../Request/Request'

export default function ViewRequest() {

    const { data } = useQuery(RequestsDocument) as { data: { requests: RequestSchema[] } }
    const authedUser = client.readQuery({
        query: VerifiedUserDocument
    }) as { verifiedUser: UserSchema }

    console.log(authedUser.verifiedUser?.department)

    const departmentChecker = ( ) => {
        if( authedUser.verifiedUser?.department === "ALL" ) return data.requests
        return data.requests.filter(( request ) => 
        request.department === authedUser.verifiedUser?.department 
        && request.department !== authedUser?.verifiedUser.department 
        )
    }

    return (
        <div>
            {
                data ? departmentChecker().map(( request, i, array ) => {
                    return (
                        <Request request={request} key={i}/>
                    )
                }) : null
            }
        </div>
    )
}
