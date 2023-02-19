"use client"


import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton } from '@mui/material'
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
            <IconButton
              className={styles.subHeaderButton}
              aria-label={'Return to Home Page'}
              onClick={ () => {
                router.push('/')
              }}
            >
              <ArrowBackIosNewIcon/>
            </IconButton>
          </ListSubheader>
        </ImageListItem>
        <div className={styles.listItemsContainer}>
          {
            stateInfo.map((place) => {
              
              return <ImageListItem key={place.id} className={styles.imgListItem}> 
                <img
                  src={`${place.images[0].url}`}
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
