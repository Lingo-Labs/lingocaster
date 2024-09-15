import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface LeaderboardEntry {
  rank: number;
  address: string;
  points: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, address: '7ZWtRSUPY1AZX7yUJw19RuosVgsTDL3KH4Q3EUYvp9Fg', points: 400 },
  { rank: 2, address: '39s1bPgJ7dsbDtV4y9ENJyWxqokA17TUfUgFqFDseiGP', points: 200 },
  { rank: 3, address: 'qGAPWtX8QTQZHoWDXYbAhKS8NQsrkxDn7574tEgCnBU', points: 100 },
];

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
              <Typography sx={{ mt: 8 }} fontWeight={700} variant="h4">Leaderboard</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: -1.75, mb: 2 }} variant="h6">Weekly points leaders</Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer 
                component={Paper} 
                sx={{ 
                  border: '1px solid black',
                  '& .MuiTableCell-root': {
                    borderBottom: '1px solid black',
                  },
                  '& .MuiTableCell-root:last-child': {
                    borderRight: 'none',
                  },
                  '& .MuiTableRow-root:last-child .MuiTableCell-root': {
                    borderBottom: '1px solid black',
                  },
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Rank</TableCell>
                      <TableCell align="left">Address</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaderboardData.map((entry) => (
                      <TableRow key={entry.rank}>
                        <TableCell align="left">{entry.rank}</TableCell>
                        <TableCell align="left">{entry.address}</TableCell>
                        <TableCell align="right">{entry.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}