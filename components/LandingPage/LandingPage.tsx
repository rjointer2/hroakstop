
import AdminView from '@/components/AdminView/AdminView'
import { client } from '@/pages/_app';
import { AuthUserDocument, VerifiedUserDocument } from '@/src/generated/graphql';
import { UserSchema } from '@/src/schema/userModels';
import { useMutation } from '@apollo/client';
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import RequestTimeOff from '../RequestTimeOff/RequestTimeOff';

export type viewType = {
  adminView: boolean,
  requestTimeOff: boolean,
  viewBalance: boolean,
}

export default function LandingPage() {  

  const [ authUser ] = useMutation(AuthUserDocument);

  const [ view, setView ] = useState<viewType>({
    adminView: false,
    requestTimeOff: false,
    viewBalance: false,
  });

  const [ auth, setAuth ] = useState(false);
  const [ admin, setAdmin ] = useState(false);
  const [ form, setForm ] = useState({
    email: "",
    ssn: ""
  });


  const submit = async () => {
    await authUser({
      variables: {
        email: form.email,
        ssn: form.ssn
      }
    }).then((data) => {
      client.writeQuery({
        query: VerifiedUserDocument,
        data: {
          verifiedUser: data.data.authUser
        }
      });
      const t = client.readQuery({ query: VerifiedUserDocument }) as { verifiedUser: UserSchema }
      t.verifiedUser.admin ? ( setAdmin(true), setAuth(true) ) : setAuth(true)
    });
  }
  

  return <div className='center makeFlexColumn' >
    {
      auth ? 
      <div>
        { admin ? ( view.adminView || view.requestTimeOff || view.viewBalance ? null : admin ? <Button variant="contained" onClick={() => setView({ ...view, adminView: !view.adminView })} >Admin View</Button> : null ) : null }
        { view.adminView ? <AdminView setView={setView} view={view} /> : null }
        <br/><br/>
        { view.adminView || view.requestTimeOff || view.viewBalance ? null : <Button variant="contained" onClick={() => setView({ ...view, requestTimeOff: !view.requestTimeOff })} >Request Time Off</Button> }
        { view.requestTimeOff ? <RequestTimeOff setView={setView} view={view} /> : null }  
      </div>
      :
       <div>

        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setForm( s => { return { ...s, email: e.target.value } } )} /> <br/><br/>
        <TextField id="outlined-basic" label="4 DIGIT PIN code" variant="outlined" onChange={(e) => setForm( s => { return { ...s, ssn: e.target.value } } )} /><br/><br/>


        <Button variant="contained" onClick={submit}>Authorize Access</Button>
      </div>
    }
  </div>
  

}

