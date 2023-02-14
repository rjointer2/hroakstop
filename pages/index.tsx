
import AdminView from '@/components/AdminView/AdminView'
import { GetUsersDocument } from '@/src/generated/graphql'

import { Button } from '@mui/material'
import { useState } from 'react'

import { useQuery } from '@apollo/client'
import LandingPage from '@/components/LandingPage/LandingPage'

export type viewType = {
  adminView: boolean,
  requestTimeOff: boolean,
  viewBalance: boolean,
}

export default function Home() {  

  const { data, error, loading } = useQuery(GetUsersDocument);

  return <LandingPage />
  

}



