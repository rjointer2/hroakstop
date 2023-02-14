
import { AddUserDocument, UpdateUserDocument, DeleteUserDocument } from '@/src/generated/graphql';
import { UserSchema } from '@/src/schema/userModels'
import { TextField, Checkbox, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material'
import { useMutation } from '@apollo/client';

import React, { useState } from 'react'
import { client } from '@/pages/_app';

export default function Employee({ user, addingNewEmployee } : { user: UserSchema, addingNewEmployee: boolean  }) {

    const [ updateUser ] = useMutation(UpdateUserDocument);
    const [ deleteUser ] = useMutation(DeleteUserDocument);
    const [ addUser ] = useMutation(AddUserDocument);

    const [ employee, setEmployee ] = useState(user);
    const [ addedNewEmployee, setAddedNewEmployee ] = useState(false);
    const [ message, setMessage ] = useState("");

    const create = async ( newEmployee: UserSchema ) => {
        if( newEmployee.fullname === "" ) {
            setAddedNewEmployee( s => true );
            setMessage('Name can not be empty!');
            return
        }
        if( newEmployee.department === "" ) {
            setAddedNewEmployee( s => true );
            setMessage('Department can not be empty!');
            return
        }
        if( newEmployee.ssn === "" ) {
            setAddedNewEmployee( s => true );
            setMessage('4 DIGIT PIN CODE can not be empty!');
            return
        }
        const test = await addUser({
            "variables": {
                department: newEmployee.department, 
                ssn: newEmployee.ssn,
                timeoff: newEmployee.timeoff,
                approver: newEmployee.approver, 
                admin: newEmployee.admin, 
                classification: newEmployee.classification, 
                fullname: newEmployee.fullname,
                email: newEmployee.email
            }
        }).then( async() => {
            await client.refetchQueries({
                include: ['getUsers']
            })
        })

        setAddedNewEmployee( s => !s );
        setMessage("Your new employee was added successful, please return to the main menu");
        
    }

    const remove = ( user_email: string) => {
        deleteUser({
            variables: {
                email: user_email
            }
        }).then( async() => {
            await client.refetchQueries({
                include: ['getUsers']
            })
        })
    }

    const update = async ( user: UserSchema ) => {
        const updatedUser = await updateUser({ 
            "variables": {
                department: user.department, 
                ssn: user.ssn,
                timeoff: user.timeoff,
                approver: user.approver, 
                admin: user.admin, 
                classification: user.classification, 
                fullname: user.fullname
            }
        }).then( async() => {
            await client.refetchQueries({
                include: ['getUsers']
            })
        })
    }

    const submit = (u: UserSchema, type: "DELETE" | "UPDATE" | "CREATE" ) => {
        if( type === 'UPDATE' ) {
            update(u);
        }

        if( type === 'DELETE' ) {
            remove(u.email);
        }

        if( type === 'CREATE' ) {
            create(u)
        }
    }

  return (
        <div>
            { addingNewEmployee ? ( 
                <TextField
                required
                id="outlined-required"
                label="Full Name"
                defaultValue={`${user.ssn}`}
                size='small'
                onChange={(e) => { { user = { ...employee, fullname: e.target.value as string}, setEmployee(user), setAddedNewEmployee(false) }}}

            />
            ) : user.fullname }
            <br/><br/>
            { addingNewEmployee ? ( 
                <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue={`${user.email}`}
                size='small'
                onChange={(e) => { { user = { ...employee, email: e.target.value as string}, setEmployee(user), setAddedNewEmployee(false) }}}

            />
            ) : user.email }
            <br/><br/>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => { { user = { ...employee, department: e.target.value as string}, setEmployee(user), setAddedNewEmployee(false)  }}}
                label="Department"
                name="department"
                size="small"
                defaultValue={employee.department}
            >
                <MenuItem value={'Event Sales'}>Event Sales</MenuItem>
                <MenuItem value={'Event Production'}>Event Production</MenuItem>
                <MenuItem value={'Member Services'}>Member Services</MenuItem>
                <MenuItem value={'Human Resources'}>Human Resources</MenuItem>
                <MenuItem value={'Facilities'}>Facilities</MenuItem>
                <MenuItem value={'ALL'}>ALL</MenuItem>
            </Select>
            </FormControl>
            <br/><br/>
            <TextField
                required
                id="outlined-required"
                label="PIN"
                defaultValue={`${user.ssn}`}
                size='small'
                onChange={(e) => { { user = { ...employee, ssn: e.target.value as string}, setEmployee(user), setAddedNewEmployee(false)  }}}
                style={{ width: '100px' }}
            />&nbsp;
            <TextField
                required
                id="outlined-required"
                label={`${user.classification === true ? "PTO ( Days )" : "Sick Hours"} Balance`}
                defaultValue={`${user.timeoff}`}
                size='small'
                onChange={(e) => { { user = { ...employee, timeoff: e.target.value as string}, setEmployee(user) }}}
                style={{ width: '150px' }}
            />
            <br/><br/>
            Approver:<Checkbox onChange={() => { user = { ...employee, approver: !employee.approver }, setEmployee(user) }} checked={employee.approver} /> 

            Admin: <Checkbox onChange={() => { user = { ...employee, admin: !employee.admin }, setEmployee(user) }} checked={employee.admin} /> 

            Full Time:<Checkbox onChange={() => { user = { ...employee, classification: !employee.classification }, setEmployee(user) }} checked={employee.classification} />
            <br/>
            { addingNewEmployee ? (
                addedNewEmployee ? message : <Button variant="contained" onClick={() => submit( employee, 'CREATE' )}>Add new employee</Button>
            ) :  <Button variant="contained" onClick={() => submit( employee, 'UPDATE' )}>Save Changes</Button> } 
            <br/><br/>
            { addingNewEmployee ? null : <Button variant="contained" color="error" onClick={() => submit( employee, 'DELETE' )}>Delete This employee</Button> }
        </div>
  )
}
