
import { viewType } from '@/pages';
import { client } from '@/pages/_app'
import { AddRequestDocument, VerifiedUserDocument } from '@/src/generated/graphql'
import { useMutation } from '@apollo/client';
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function RequestTimeOff({ setView, view } : { setView: React.Dispatch<React.SetStateAction<viewType>>, view: viewType }) {

    const { verifiedUser } = client.readQuery({"query": VerifiedUserDocument});

    const [ addRequest ] = useMutation(AddRequestDocument);

    const [ success, setSuccess ] = useState(false)

    const [ timeoff, setTimeoff ] = useState("");

    const submit = async () => {
        await addRequest({
            variables: {
                department: verifiedUser.department,
                createdByWho: verifiedUser.fullname,
                timeoff
            }
        }).then(() => setSuccess(true))
    }


  return (
    <div className='center makeFlexColumn'>
        <Button variant="contained" onClick={() => setView({ ...view, requestTimeOff: !view.requestTimeOff })} >Back Main Menu</Button>
        <br/><br/>
        {verifiedUser.fullname}
        <br/><br/>
        Enter Date Format MM/DD/YYYY<br/> 
        or for consecutive days use the <br/> 
        MM/DD/YYYY - MM/DD/YYYY Format
        <br/><br/> 
        <TextField id="outlined-basic" label="MM/DD/YYYY" variant="outlined" onChange={(e) => setTimeoff(e.target.value)} /><br/><br/>

        { success ? "Request was sent! You should receive a email confirmation shortly!" : <Button variant="contained" onClick={submit}>Submit</Button> }
    </div>
  )
}
