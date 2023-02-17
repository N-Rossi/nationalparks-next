"use client"


import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Grid, Box, Button, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { stateList } from './stateList'
import { stateInfo } from './results/stateInfo'
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // use States
  const [state, setState] = useState("")
  const [stateChosen, setStateChosen] = useState({
    id: "",
    value: ""
  })

  const router = useRouter()

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
    await axios.get(`https://developer.nps.gov/api/v1/places?stateCode=` + stateId + `&api_key=eJnkCdoOGwmfjjCQTSLBaMugyccloNBRXKDj7kjq&limit=12`).then(
      res => {
        const places = res.data
        let placesFixed = places.data
        console.log("Places Fixed: ", placesFixed)

        placesFixedOut = placesFixed
      }
    )
    // setPlacesData(placesFixedOut)
    stateInfo.splice(0, stateInfo.length)
    for(let i=0; i<placesFixedOut.length; i++) {
      stateInfo.push(placesFixedOut[i])
    }
    console.log(stateInfo)
    router.push('/results')
  }

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#E7A164'
      }
    }
  })


  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>Start Exploring</h1>
      <Box color="white"
        p={5} className={styles.box}>

        <Box 
          p={5} className={styles.innerBox}>
            <h1 className={styles.text}>Where would you like to go?</h1>
            <Divider/>
        </Box>

        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={8}
          className={styles.mainGrid}
        >
          <Grid item xs={8} className={styles.SelectionContainer}>
            <FormControl fullWidth>
              <InputLabel className={styles.text} id="demo-simple-select-label">State Selection</InputLabel>
              <Select
                labelId="State Selection"
                id="state-selection"
                value={state}
                label="state"
                onChange={updateStateSelect}
              >
                <MenuItem className={styles.text} value="choose" disabled>
                  -- Select State --
                </MenuItem>
                {
                  stateList.map((state) => {
                    return <MenuItem className={styles.text} key={state.id} value={state.id}>{state.value}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={8} className={styles.submitButtonContainer}>
            <Box>
              <ThemeProvider theme={theme}>
                <Button color="neutral" variant="contained"
                  onClick={handleStateSubmit}
                  className={styles.SubmitButton}
                >Submit</Button>
              </ThemeProvider>
            </Box>
          </Grid>

        </Grid>
      </Box>

    </main>
  )
}
