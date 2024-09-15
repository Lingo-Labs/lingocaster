import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { usePortal } from '@/providers/portal';
import { useSnackbar } from '@/providers/snackbar';

const storeItems = [
  {
    id: 1,
    image: 'https://duoplanet.com/wp-content/uploads/2023/02/Duolingo-streak-freeze-1.png',
    title: 'Streak Freeze',
    subtitle: 'Maintain your streak even if you miss a day',
    price: '5 PYUSD',
  },
  {
    id: 2,
    image: 'https://duoplanet.com/wp-content/uploads/2021/05/Duolingo-Tips-EVERY-user-should-know-about.png',
    title: 'Ad Removal',
    subtitle: 'Enjoy an ad-free experience for 30 days',
    price: '10 PYUSD',
  },
  {
    id: 3,
    image: 'https://i.pcmag.com/imagery/articles/01QBitPU4YBuLXNxsNDcNtM-1..v1651826978.jpg',
    title: 'Double Points',
    subtitle: 'Get 2x points for your next 5 games',
    price: '8 PYUSD',
  },
];

export default function Home() {
  const portal = usePortal();
  const snackbar = useSnackbar();

  const tokenMint = process.env.pyusdMint || ''
  const [txnOngoing, setTxnOngoing] = useState(false);

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
              <Typography sx={{ mt: 8 }} fontWeight={700} variant="h4">Game Store</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: -1.75, mb: 4 }} variant="h6">Use PYUSD to buy streak freezes, remove ads, & more!</Typography>
            </Grid>
            {storeItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                    }}
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.subtitle}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                      {item.price}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      sx={{ '&:hover': { backgroundColor: 'primary.main' } }}
                      disabled={txnOngoing}
                      onClick={async () => {
                        try {
                          setTxnOngoing(true);
                          const hash = await portal.sendTokensOnSolana(
                            "39s1bPgJ7dsbDtV4y9ENJyWxqokA17TUfUgFqFDseiGP",
                            tokenMint,
                            Number(item.price),
                          );
      
                          snackbar.setSnackbarOpen(true);
                          snackbar.setSnackbarContent({
                            severity: 'success',
                            message: `Bet placed! Your bet will be returned if they don't accept. Transaction hash - ${hash}`,
                          });
                        } catch (e) {
                          snackbar.setSnackbarOpen(true);
                          snackbar.setSnackbarContent({
                            severity: 'error',
                            message: `Something went wrong - ${e}`,
                          });
                        } finally {
                          setTxnOngoing(false);
                        }
                      }}
                    >
                      Purchase
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
