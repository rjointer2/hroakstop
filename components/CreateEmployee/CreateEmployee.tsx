
import React from 'react'
import { Button } from '@mui/material'
import Employee from '../Employee/Employee'

export default function CreateEmployee() {
  return (
    <div>
        <Employee 
            user={{
                admin: false,
                approver: false,
                classification: false,
                ssn: "",
                email: "",
                fullname: "",
                timeoff: "0",
                department: ""
            }} 
            addingNewEmployee={true}
        />
    </div>
  )
}
