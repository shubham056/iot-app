import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import Skeleton from 'react-loading-skeleton';

const DeviceStats = React.memo((props) => {
  const { isStaticTxtValue1, isStaticTxtValue2, isStaticTxtValue3, isStaticTxtValue4, isStaticValue1, isStaticValue2, isStaticValue3, isStaticValue4, isGraphStatsLoading } = props
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid spacing={1} item xs={12} sm={6} md={3}>
        <Card className='' sx={{
          maxWidth: 345, boxShadow: 2, margin: "0 5px 10px", ':hover': {
            boxShadow: 5,
          }
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', fontSize: 14 }}>
              {isStaticTxtValue1}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, border: "1.5px solid rgb(0, 176, 136)", padding: 8 }}>
              {isGraphStatsLoading ? <Skeleton height={15} width={100} /> : <span style={{ fontSize: 22 }}><span style={{ color: "rgb(0, 176, 136)" }}> {parseFloat(isStaticValue1).toFixed(1)} </span> Hz </span>}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid spacing={1} item xs={12} sm={6} md={3}>
        <Card className='' sx={{
          maxWidth: 345, boxShadow: 2, margin: "0 5px 10px", ':hover': {
            boxShadow: 5,
          }
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', fontSize: 14 }}>
              {isStaticTxtValue2}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, border: "1.5px solid rgb(0, 176, 136)", padding: 8 }}>
              {isGraphStatsLoading ? <Skeleton height={15} width={100} /> : <span style={{ fontSize: 22 }}><span style={{ color: "rgb(0, 176, 136)" }}> {isStaticValue2} </span> % </span>}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid spacing={1} item xs={12} sm={6} md={3}>
        <Card className='' sx={{
          maxWidth: 345, boxShadow: 2, margin: "0 5px 10px", ':hover': {
            boxShadow: 5,
          }
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', fontSize: 14 }}>
              {isStaticTxtValue3}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, border: "1.5px solid rgb(0, 176, 136)", padding: 8 }}>
              {isGraphStatsLoading ? <Skeleton height={15} width={100} /> : <span style={{ fontSize: 22 }}><span style={{ color: "rgb(0, 176, 136)" }}>{parseFloat(isStaticValue3).toFixed(1)} </span> Kw </span>}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid spacing={1} item xs={12} sm={6} md={3}>
        <Card className='' sx={{
          maxWidth: 345, boxShadow: 2, margin: "0 5px 10px", ':hover': {
            boxShadow: 5,
          }
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', fontSize: 14 }}>
              {isStaticTxtValue4}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, border: "1.5px solid rgb(0, 176, 136)", padding: 8 }}>
              {isGraphStatsLoading ? <Skeleton height={15} width={100} /> : <span style={{ fontSize: 22 }}><span style={{ color: "rgb(0, 176, 136)" }}>{isStaticValue4} </span> kwh</span>}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
})

export default DeviceStats