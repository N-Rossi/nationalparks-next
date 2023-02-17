"use client"


import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Grid, Box, Button, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { stateList } from './stateList'
import { stateInfo } from './stateInfo'
import axios from 'axios'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // use States
  const [state, setState] = useState("")

  return (
    <main className={styles.mainContainer}>

      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={8}
        className={styles.mainGrid}
      >
        <Grid item xs={12}>
          <List component="nav"  className={styles.resultList}>
            {
              stateInfo.map((place) => {
                return <div key={place.id}>
                <ListItem divider>
                  <a className={styles.listItemText} href={place.url} target="_blank" key={place.id}>{place.title}</a>
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
