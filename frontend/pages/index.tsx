import { ITokenBalance, usePortal } from '@/providers/portal';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Refresh, Token } from '@mui/icons-material';
import { useSnackbar } from '@/providers/snackbar';

export default function Home() {
  const portal = usePortal();
  const snackbar = useSnackbar();

  const [tokens, setTokens] = useState<ITokenBalance[]>([]);
  const [tokensLoading, setTokensLoading] = useState(false);

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
        <Box sx={{ mt: 8 }}>
          <Grid container>
            <Grid item xs={8}>
              <Typography sx={{ fontWeight: 'bold', pl: 6 }} textAlign="left" variant="h4" component={'h1'}>
                My Tokens
              </Typography>
            </Grid>
            <Grid item xs={4} textAlign="right">
              <Button
                sx={{ pr: 6, pt: 6 }}
                color="inherit"
                onClick={() => {
                  loadTokens();
                }}
                startIcon={<Refresh />}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
          <Box>
            <List sx={{ 
              bgcolor: 'background.paper', 
              p: { md: '0 32px 32px 32px' } 
            }}>
              {tokens.length && !tokensLoading
                ? tokens
                    .map((token, idx) => {
                      return (
                        <ListItem key={idx}>
                          <ListItemAvatar>
                            <Avatar
                              alt={token.symbol}
                              src={token.metadata?.thumbnail as string}
                            >
                              {!token.metadata?.thumbnail ? <Token /> : <></>}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography fontSize={{ xs: 14, md: 16 }}>
                                {token.name}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                display={{ xs: 'none', md: 'block' }}
                                fontSize={12}
                              >
                                {token.metadata.tokenMintAddress}
                              </Typography>
                            }
                          />
                          <ListItemText
                            sx={{
                              textAlign: 'right',
                            }}
                            primary={
                              <Typography
                                fontSize={{ xs: 14, md: 20 }}
                                fontWeight={600}
                                color="primary"
                              >
                                <Typography
                                  component="span"
                                  fontSize={{ xs: 12, md: 16 }}
                                >
                                  {token.symbol}{' '}
                                </Typography>
                                {`${Number(token.balance).toFixed(3)}`}
                              </Typography>
                            }
                          />
                        </ListItem>
                      );
                    })
                    .flatMap((item, idx) => {
                      if (idx === tokens.length - 1) {
                        return [item];
                      }
                      return [
                        item,
                        <Divider key={idx} variant="inset" component="li" />,
                      ];
                    })
                : tokensLoading && (
                    <ListItem sx={{ justifyContent: 'center' }}>
                      <CircularProgress />
                    </ListItem>
                  )}
            </List>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
