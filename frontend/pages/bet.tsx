import { ITokenBalance, usePortal } from '@/providers/portal';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
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
  const [interactor, setInteractor] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setInteractor(searchParams.get('interactor') || '');
    console.log('interactor: ', interactor);
  }, [interactor]);

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
            // p: { md: 8 },
            // py: { xs: 8, md: 16 },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={{ xs: 0.5, md: 2 }} maxWidth={785}>
            <Grid item xs={12}>
              <Typography sx={{ mt: 8 }} fontWeight={700} variant="h4">Bet a Friend</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: -1.75 }} variant="h6">Who will have more points by the end of this week?</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: 2 }} variant="h6">Who are you challenging?</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="@username"
                variant="outlined"
                onChange={(e) => setTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: 2 }} variant="h6">What token?</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="token-select-label">Token</InputLabel>
                <Select
                  labelId="token-select-label"
                  label="Token"
                  disabled={tokensLoading}
                  defaultValue={tokenMint}
                  onChange={(e) => setTokenMint(e.target.value)}
                >
                  {tokens
                    .filter(
                      (token) =>
                        token.metadata.tokenMintAddress !== process.env.solMint,
                    )
                    .map((token, idx) => (
                      <MenuItem
                        key={idx}
                        value={token.metadata.tokenMintAddress}
                      >
                        <Typography
                          fontSize={{ xs: 8, md: 12 }}
                          color="primary"
                        >
                          <Typography
                            component="span"
                            color="black"
                            fontSize={{ xs: 12, md: 18 }}
                          >
                            {token.symbol}{' '}
                          </Typography>
                          {` ${Number(token.balance).toFixed(3)}`}
                        </Typography>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: 2 }}  variant="h6">How much?</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                onChange={(e) => setTokenAmount(Number(e.target.value))}
              />
            </Grid>
            <Grid
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
                      "39s1bPgJ7dsbDtV4y9ENJyWxqokA17TUfUgFqFDseiGP",
                      tokenMint,
                      tokenAmount,
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
                Place Bet
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
