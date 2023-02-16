"use client"

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Grid, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { stateList } from './stateList'
import axios from 'axios'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // use States
  const [state, setState] = useState("")
  const [stateChosen, setStateChosen] = useState({
    id: "",
    value: ""
  })
  const [placesData, setPlacesData] = useState()

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
    retrieveParksInfo(stateChosen.id)
  }

  const retrieveParksInfo = async (stateId) => {
    await axios.get(`https://developer.nps.gov/api/v1/places?stateCode=` + stateId + `&api_key=eJnkCdoOGwmfjjCQTSLBaMugyccloNBRXKDj7kjq`).then(
      res => {
        const places = res.data
        setPlacesData({places})
      }
    )
    // console.log(placesData.places.data[1].title)
    console.log(placesData.places.data)
  }


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
          <MenuItem value="choose" disabled>
            -- Select State --
          </MenuItem>
          {
            stateList.map((state) => {
              return <MenuItem key={state.id} value={state.id}>{state.value}</MenuItem>
            })
          }
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
