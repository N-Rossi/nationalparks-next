"use client"


import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Grid, Box, Button, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
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
  const [placesData, setPlacesData] = useState([])

  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    if(stateChosen.id !== "" && stateChosen.value !== "") {
      retrieveParksInfo(stateChosen.id)
    }
    
  }, [stateChosen])

  const updateStateSelect = (event) => {
    console.log(event.target.value)
    setState(event.target.value)
  }

  const handleStateSubmit = async () => {
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

  const retrieveParksInfo = async (stateId) => {
    let placesFixedOut
    await axios.get(`https://developer.nps.gov/api/v1/places?stateCode=` + stateId + `&api_key=eJnkCdoOGwmfjjCQTSLBaMugyccloNBRXKDj7kjq&limit=50`).then(
      res => {
        const places = res.data
        let placesFixed = places.data
        console.log("Places Fixed: ", placesFixed)

        placesFixedOut = placesFixed
      }
    )
    console.log(placesFixedOut)
    setPlacesData(placesFixedOut)
  }


  return (
    <main className={styles.mainContainer}>

      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={8}
        className={styles.mainGrid}
      >
        <Grid item xs={8} className={styles.SelectionContainer}>
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
        
        <Grid item xs={8} className={styles.submitButtonContainer}>
          <Box>
            <Button variant="contained"
              onClick={handleStateSubmit}
            >Submit</Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <List component="nav"  className={stateChosen.id !== "" ? styles.resultList : styles.emptyResultList}>
            {
              placesData.map((place) => {
                return <div>
                <ListItem divider>
                  <a href={place.url} key={place.id}>{place.title}</a>
                </ListItem>
                <Divider />
                </div>
              })
            }
          </List>
        </Grid>

      </Grid>

    </main>
  )
}
