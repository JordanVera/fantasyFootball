import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { teamsArr } from '../config/teams';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PicksAccordion = ({ week, user, team, setTeam }) => (
  <Accordion key={week} className="accordian">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <h2>Week {week}</h2>
    </AccordionSummary>
    <AccordionDetails>
      <form
        method="POST"
        action={`http://localhost:5555/api/users/makePicks/${week}`}
      >
        {Array.from({ length: user.bullets }, (_, i) => (
          <FormControl fullWidth key={i} className="select">
            <InputLabel id="demo-simple-select-label">{`Pick ${
              i + 1
            }`}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={team}
              label={`Pick ${i + 1}`}
              onChange={(e) => setTeam(e.target.value)}
            >
              {teamsArr?.map((team, j) => {
                return (
                  <MenuItem value={team} key={j}>
                    {team}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ))}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </AccordionDetails>
  </Accordion>
);

const createPicksAccordians = (numberOfWeeksInNflSeason, user) => {
  return Array.from({ length: numberOfWeeksInNflSeason }, (_, index) => (
    <PicksAccordion key={index + 1} week={index + 1} user={user} />
  ));
};

export default function PicksModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { user, users, isSuccess } = useSelector((state) => state.auth);
  const [team, setTeam] = useState('');

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      id="picksModal"
    >
      <Box sx={style}>
        <h2>Make Your Picks</h2>

        {createPicksAccordians(18, user)}
      </Box>
    </Modal>
  );
}
