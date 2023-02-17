"use client"


import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material'
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

      <Grid container spacing={4} justify="center" className={styles.gridContainer}>
        {
          stateInfo.map((place) => {
            return <Grid item xs={12} sm={6} md={4} key={place.id}>                  
              <Card className={styles.card}>
                <CardContent>
                  <Typography className={styles.cardTitle} gutterBottom color="textSecondary">
                    {place.title}
                  </Typography>
                  <br/>
                  
                  <a href={place.url} target="_blank" key={place.id}>{place.title}</a>
                </CardContent>
              </Card>
            </Grid>
          })
        }
      </Grid>
    </main>

  )
}
