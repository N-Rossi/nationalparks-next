"use client"


import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, Typography } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { stateInfo } from './stateInfo'
import { useRouter } from 'next/navigation'



const inter = Inter({ subsets: ['latin'] })

export default function Results() {

  const router = useRouter()

  return ( 
    <main className={styles.mainContainer}>

        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader className={styles.subheader} component="div">
            <h2 className={styles.subheaderText}>Places To Visit!</h2>
          </ListSubheader>
        </ImageListItem>
        <div className={styles.listItemsContainer}>
          {
            stateInfo.map((place) => {
              
              return <ImageListItem key={place.id} className={styles.imgListItem}> 
                <img
                  src={`${place.images[0].url}`}
                  srcSet={`${place.images[0].url}`}
                  alt={place.title}
                  loading="lazy"
                  className={styles.image}
                />
                <ImageListItemBar
                  sx={{backgroundColor: 'rgba(0, 0, 0, 0.750)'}}
                  className={styles.image}
                  title={place.title}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${place.title}`}
                      onClick={ () => {
                        window.open(`${place.url}`, '_blank')
                      }}
                    >
                      <ArrowCircleRightIcon/>
                    </IconButton>
                  }
                />
              </ImageListItem>
            })
          }
        </div>
    </main>

  )
}
