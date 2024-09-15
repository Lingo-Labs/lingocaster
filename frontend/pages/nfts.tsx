import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';

export default function Home() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={{ xs: 0.5, md: 2 }} maxWidth={785}>
            <Grid item xs={12}>
              <Typography sx={{ mt: 8 }} fontWeight={700} variant="h4">My NFTs</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: -1.75 }} variant="h6">A digital collection of your streaks and milestones!</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}