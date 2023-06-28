import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getScores } from '../features/scores/scoresSlice.js';
import { getUsers } from '../features/auth/authSlice.js';
import Table from '../components/Table.jsx';
import { Box, Button } from '@mui/material';
import PicksModal from '../components/PicksModal.jsx';
import RulesModal from '../components/RulesModal.jsx';

export default function Home() {
  const { user, users, isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const scoresStatus = useSelector((state) => state.scores.status);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (scoresStatus === 'idle') {
      dispatch(getScores());
    }
  }, [scoresStatus, dispatch]);

  useEffect(() => {
    if (!isSuccess && users.length === 0) {
      dispatch(getUsers());
    }
  }, [isSuccess, users.length, dispatch]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme ? 'dark' : 'light');
  }, [theme]);

  const totalBullets = users.reduce(
    (accumulator, user) => accumulator + user.bullets,
    0
  );

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box className="heading">
        <h1>{user?.name}'s Dashboard</h1>
        <Button variant="contained" onClick={handleOpen}>
          Make Picks
        </Button>
        <RulesModal />
        <p>
          There is a total of {users.length} users with {totalBullets} entries
          which makes the prize pool ${totalBullets * 50}
        </p>
        <p>Once you buy-in you will be able to make your picks</p>
        <p className="bold">Please make sure to read the rules</p>
        <p className="blue">
          ***Please note you must make your pick on Thursday before 6pm CST (7pm
          EST) for every bullet. Even if you are not picking the thursday
          game.***
        </p>
      </Box>
      <PicksModal open={open} setOpen={setOpen} />

      <Table />
    </>
  );
}
