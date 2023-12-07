import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useState, useEffect } from 'react';

const LineLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 90) {
          return 90;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 90);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress}     />
    </div>
  );
}

export default LineLoader;
