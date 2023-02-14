


import { client } from '@/pages/_app'
import { AddRequestDocument, DeleteRequestDocument, GetUsersDocument, RequestsDocument, UpdateRequestDocument } from '@/src/generated/graphql'
import { UserSchema } from '@/src/schema/userModels'
import React, { useState } from 'react'

import { TextField, Checkbox, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { RequestSchema } from '@/src/schema/RequestModel'

export default function Request({ request } : { request: RequestSchema }) {

    const [ updateRequest ] = useMutation(UpdateRequestDocument);
    const [ deleteRequest ] = useMutation(DeleteRequestDocument);

    const [ message, setMessage ] = useState({
        approvalSent: false,
        state: ""
    })

    const sumbit = async ( id: string, type: 'UPDATE' | 'DELETE' ) => {
        if( type === 'UPDATE' ) {
          await updateRequest({ variables: {
            'id': id
        } })

        setMessage(s => {
          return {
            ...s,
            approvalSent: true,
            state: `Approval email was sent to ${request.createdByWho}`
          }
        })
        }

        if( type === 'DELETE' ) {
          
          await deleteRequest({ variables: {
            'id': id
        } }).then((e) => {
          
          setMessage(s => {
            return {
              ...s,
              approvalSent: true,
              state: `Declinal email was sent to ${request.createdByWho}`
            }
          })
        }).catch(e => console.log(e))



      }

    }

    return (
      <div>
      { message.approvalSent === false ? <><div>
          { request.createdByWho } <br/>
          Department: { request.department } <br/>
          Requested: { request.timeoff }<br/>
          Employee's List Dates Requested <br/><br/>
          <Button variant="contained" onClick={() => sumbit( request.id, 'UPDATE' )} >Approve</Button> <Button variant="contained" color="error" onClick={() => sumbit( request.id, 'DELETE' )} >Decline</Button>
          <br/>
      </div>
      _______________________________
      <br/><br/></> : <div>{message.state}<br/> ________________________<br/><br/></div>}
  </div>
    )
}