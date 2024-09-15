import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { usePortal } from '@/providers/portal';

// Sample NFT data (replace this with your actual data)
const nfts = [
  { id: 1, image: '/path/to/image1.jpg', title: 'First Lingocast!', subtitle: 'You played your first game on Lingocaster!' },
  { id: 2, image: '/path/to/image2.jpg', title: '1 Day Streak', subtitle: 'Your highest streak is 1 day! Keep it up!' },
  { id: 3, image: '/path/to/image2.jpg', title: 'Send PYUSD', subtitle: 'You used PYUSD for a challenge' },
  { id: 4, image: '/path/to/image2.jpg', title: 'Challenge a Friend', subtitle: 'You challenged @johnsmith 10 PYUSD' },

  // Add more NFT objects as needed
];

export default function Home() {
  const portal = usePortal();
  const [solanaAddress, setSolanaAddress] = useState('');

  const fetchSolanaAddress = async () => {
    try {
      const address = await portal.getSolanaAddress();
      setSolanaAddress(address);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (portal.ready) {
      fetchSolanaAddress();
    }
  }, [portal.ready]);

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
            
            {/* NFT Cards */}
            {solanaAddress === '7ZWtRSUPY1AZX7yUJw19RuosVgsTDL3KH4Q3EUYvp9Fg' && 
              nfts.map((nft) => (
                <Grid item xs={12} sm={6} md={4} key={nft.id}>
                  <Card
                    sx={{
                      transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={nft.image}
                      alt={nft.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {nft.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {nft.subtitle}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}