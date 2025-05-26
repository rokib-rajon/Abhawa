import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const Ticker = () => {
  const [tickerContent, setTickerContent] = useState('');

  useEffect(() => {
    fetch('/ticker.md')
      .then((res) => res.text())
      .then((text) => {
        // Remove markdown header and join lines for ticker
        const lines = text.split('\n').filter(line => line.trim() && !line.startsWith('#'));
        setTickerContent(lines.join('   •   '));
      });
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(90deg, #0099ff22 0%, #00d4ff11 100%)',
        borderRadius: '10px',
        boxShadow: '0 1px 8px 0 rgba(0,0,0,0.07)',
        mb: 2,
        py: 1,
        px: 2,
        position: 'relative',
        minHeight: '32px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'fit-content',
          animation: 'ticker-scroll 18s linear infinite',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '14px', sm: '18px' },
            color: 'gray',
            fontWeight: 500,
            letterSpacing: '0.5px',
            mx: 0.5,
          }}
        >
          {tickerContent}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '14px', sm: '18px' },
            color: 'gray',
            fontWeight: 500,
            letterSpacing: '0.5px',
            mx: 0.5,
          }}
        >
          {tickerContent}
        </Typography>
      </Box>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </Box>
  );
};

export default Ticker;