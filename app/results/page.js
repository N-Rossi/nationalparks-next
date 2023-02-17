"use client"


import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, Button } from '@mui/material'
import { stateInfo } from './stateInfo'



const inter = Inter({ subsets: ['latin'] })

export default function Results() {

  return (
    <main className={styles.mainContainer}>

      <ImageList sx={{width: 1000, height: 810}}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Places to Visit!</ListSubheader>
        </ImageListItem>
        {
          stateInfo.map((place) => {
            return <ImageListItem key={place.id}> 
              <img
                src={`${place.images[0].url}?w=248fit=crop&auto=format`}
                srcSet={`${place.images[0].url}?w=248fit=crop&auto=format&dpr=2 2x`}
                alt={place.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={place.title}
                actionIcon={
                  <IconButton
                    sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                    aria-label={`info about ${place.title}`}
                    onClick={ () => {
                      window.open(`${place.url}`, '_blank')
                    }}
                  >
                    <Button variant="contained">Learn more!</Button>
                  </IconButton>
                }
              />
            </ImageListItem>
          })
        }
      </ImageList>
    </main>

  )
}
