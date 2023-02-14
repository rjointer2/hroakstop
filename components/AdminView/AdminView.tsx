
import { viewType } from '@/pages'
import { GetUsersDocument } from '@/src/generated/graphql';
import { Button } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import CreateEmployee from '../CreateEmployee/CreateEmployee';
import ViewRequest from '../ViewRequest/ViewRequest';
import ViewYourEmployees from '../ViewYourEmployees/ViewYourEmployees';



export default function AdminView({ setView, view } : { setView: Dispatch<SetStateAction<viewType>>, view: viewType }) {

    const [ toggle, setToggle ] = useState({
        addEmployee: false,
        viewEmployee: false,
        addEmployeeForm: false,
        viewRequest: false
    });


    return (
        <div>
            <Button variant="contained" onClick={() => setView({ ...view, adminView: !view.adminView })} >Back Main Menu</Button>
            <br/><br/>
            { toggle.addEmployee ? null : <Button variant="contained" onClick={() => setToggle( s => { return { ...s, viewEmployee: !s.viewEmployee, addEmployee: true }} )} >
                { toggle.viewEmployee ? 'Close Employee View' : 'View Your Employees' }
            </Button> }
            <br/><br/>
            { toggle.viewRequest ? null : <Button variant="contained" onClick={() => setToggle( s => { return { ...s, viewRequest: !s.viewRequest, addEmployee: true }} )} >View Time Off Request</Button> } <br/><br/>
            { toggle.viewRequest ? <ViewRequest /> : null }
            { toggle.viewEmployee ? <ViewYourEmployees /> : null }
            { toggle.addEmployee ? null : <Button variant="contained"  onClick={() => setToggle( s => { return { ...s, addEmployee: !s.addEmployee, addEmployeeForm: true }} )} >Add New Employee</Button> }
            { toggle.addEmployeeForm ? <CreateEmployee /> : null }

        </div>
    )
}
