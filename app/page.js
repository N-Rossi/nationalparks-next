"use client"

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Grid, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [state, setState] = useState("")
  const [stateChosen, setStateChosen] = useState({
    id: "",
    value: ""
  })

  const updateStateSelect = (event) => {
    console.log(event.target.value)
    setState(event.target.value)
  }

  const handleStateSubmit = () => {
    console.log("Inside handleStateSubmit")
    for(let i = 0; i<stateList.length; i++) {
      if(state === stateList[i].id) {
        console.log("State matched: " + state + " " + stateList[i].id)
        setStateChosen({
          id: stateList[i].id,
          value: stateList[i].value
        })
      }
    }
  }

  const stateList = [
    {id: "ak", value: "Alaska"},
    {id: "ar", value: "Arkansas"},
    {id: "az", value: "Arizona"},
    {id: "ca", value: "California"},
    {id: "co", value: "Colorado"},
    {id: "fl", value: "Florida"},
    {id: "hi", value: "Hawaii"},
    {id: "id", value: "Idaho"},
    {id: "ky", value: "Kentucky"},
    {id: "in", value: "Indiana"},
    {id: "me", value: "Maine"},
    {id: "mi", value: "Michigan"},
    {id: "mn", value: "Minnesota"},
    {id: "mo", value: "Missouri"},
    {id: "mt", value: "Montana"},
    {id: "nv", value: "Nevada"},
    {id: "nm", value: "New Mexico"},
    {id: "nd", value: "North Dakota"},
    {id: "nc", value: "North Carolina"},
    {id: "oh", value: "Ohio"},
    {id: "or", value: "Oregon"},
    {id: "sc", value: "South Carolina"},
    {id: "sd", value: "South Dakota"},
    {id: "tn", value: "Tennessee"},
    {id: "tx", value: "Texas"},
    {id: "ut", value: "Utah"},
    {id: "va", value: "Virginia"},
    {id: "wa", value: "Washington"},
    {id: "wv", value: "West Virginia"},
    {id: "wy", value: "Wyoming"}
  ]


  return (
    <main>

  <Grid
    container
    direction="row"
    alignItems="center"
    spacing={8}
  >
    <Grid item xs={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State Selection</InputLabel>
        <Select
          labelId="State Selection"
          id="state-selection"
          value={state}
          label="state"
          onChange={updateStateSelect}
        >
          <MenuItem value={"oh"}>Ohio</MenuItem>
          <MenuItem value={"ca"}>California</MenuItem>
          <MenuItem value={"nc"}>North Carolina</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    
    <Grid item xs={4}>
      <Box>
        <Button variant="contained"
          onClick={handleStateSubmit}
        >Submit</Button>
      </Box>
    </Grid>

    <Grid item xs={4}>
      <h1>{stateChosen.value}</h1>
    </Grid>

  </Grid>

    </main>
  )
}
