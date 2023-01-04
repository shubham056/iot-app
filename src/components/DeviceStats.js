import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import Skeleton from 'react-loading-skeleton';

const DeviceStats = (props) => {
  const { isStaticTxtValue1, isStaticTxtValue2, isStaticTxtValue3, isStaticTxtValue4, isStaticValue1, isStaticValue2, isStaticValue3, isStaticValue4, isGraphStatsLoading} = props
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
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
              {isStaticTxtValue1}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, border: "1px solid #1d9b9c", padding: 12 }}>
              {isGraphStatsLoading ? <Skeleton height={15} width={100} /> : `${parseFloat(isStaticValue1).toFixed(1)} V`}
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
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
              {isStaticTxtValue2}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, border: "1px solid #1d9b9c", padding: 12 }}>
              {isGraphStatsLoading ? <Skeleton height={15} width={100} /> : `${isStaticValue2} A`}
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
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
              {isStaticTxtValue3}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, border: "1px solid #1d9b9c", padding: 12 }}>
              {isGraphStatsLoading ? <Skeleton height={15} width={100} /> : `${parseFloat(isStaticValue3).toFixed(1)} Kw`}
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
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
              {isStaticTxtValue4}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, border: "1px solid #1d9b9c", padding: 12 }}>
              {isGraphStatsLoading ? <Skeleton height={15} width={100} /> : `${isStaticValue4} kwh`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

export default DeviceStats