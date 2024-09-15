import { ITokenBalance, usePortal } from '@/providers/portal';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useSnackbar } from '@/providers/snackbar';

export default function Home() {
  const portal = usePortal();
  const snackbar = useSnackbar();

  const [to, setTo] = useState('');
  const [tokenMint, setTokenMint] = useState(process.env.pyusdMint || '');
  const [tokenAmount, setTokenAmount] = useState(0);
  const [tokens, setTokens] = useState<ITokenBalance[]>([]);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [txnOngoing, setTxnOngoing] = useState(false);

  const loadTokens = async () => {
    try {
      setTokensLoading(true);
      const tokens = await portal.getSolanaTokenBalances();
      if (tokens) setTokens(tokens);
    } catch (e) {
      snackbar.setSnackbarOpen(true);
      snackbar.setSnackbarContent({
        severity: 'error',
        message: `Something went wrong - ${e}`,
      });
    } finally {
      setTokensLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
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
          <Grid container spacing={{ xs: 0.5, md: 2 }} maxWidth={1000}>
            <Grid item xs={12}>
              <Typography sx={{ mt: 8 }} fontWeight={700} variant="h4">Game Store</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: -1.75 }} variant="h6">Use PYUSD to buy streak freezes, remove ads, & more!</Typography>
            </Grid>
         
            
            {/* <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                size="large"
                variant="outlined"
                sx={{ mt: 2 }}
                disabled={
                  txnOngoing ||
                  tokensLoading ||
                  !to ||
                  !tokenAmount ||
                  !tokenMint
                }
                onClick={async () => {
                  try {
                    setTxnOngoing(true);
                    const hash = await portal.sendTokensOnSolana(
                      to,
                      tokenMint,
                      tokenAmount,
                    );

                    snackbar.setSnackbarOpen(true);
                    snackbar.setSnackbarContent({
                      severity: 'success',
                      message: `Sent tokens successfully. Transaction hash - ${hash}`,
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
                Place Bet
              </Button>
            </Grid> */}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
