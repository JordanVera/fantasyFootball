import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { teamsArr } from '../config/constants';
import { makePicks } from '../features/auth/authSlice';
import { NUMBER_OF_WEEKS_IN_NFL } from '../config/constants';

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

const WeekAccordion = ({ week, user }) => {
  const { register, handleSubmit } = useForm();
  const [team, setTeam] = useState(Array(user.bullets).fill(''));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    dispatch(makePicks({ data, user, week }));

    // console.log(data);
    // console.log(week);
    // console.log(user);
    navigate('/');
  };

  return (
    <Accordion key={week} className="accordion">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h2>Week {week}</h2>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onSubmit)}>
          {Array.from({ length: user.bullets }, (_, index) => (
            <PickSelect
              key={index}
              index={index}
              register={register}
              team={team}
              setTeam={setTeam}
            />
          ))}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

const PickSelect = ({ index, register, team, setTeam }) => {
  const handleChange = (event) => {
    const updatedTeam = [...team];
    updatedTeam[index] = event.target.value;
    setTeam(updatedTeam);
  };

  const disableOption = (option, currentWeek) => {
    // Check if the selected option has already been selected in previous weeks
    for (let i = 0; i < index; i++) {
      if (team[i] === option) {
        return true;
      }
    }

    // Check if the selected option has been selected in the current week or subsequent weeks
    for (let i = index + 1; i < team.length; i++) {
      if (team[i] === option) {
        return true;
      }
    }

    return false;
  };

  return (
    <FormControl fullWidth className="select">
      <InputLabel id={`demo-simple-select-label-${index}`}>
        {`Pick ${index + 1}`}
      </InputLabel>
      <Select
        {...register(`pick-${index + 1}`)}
        labelId={`demo-simple-select-label-${index}`}
        value={team[index]}
        label={`Pick ${index + 1}`}
        onChange={handleChange}
      >
        {teamsArr?.map((teamOption) => (
          <MenuItem
            value={teamOption}
            key={teamOption}
            disabled={disableOption(teamOption)}
          >
            {teamOption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default function PicksModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { user } = useSelector((state) => state.auth);

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

        {Array.from({ length: NUMBER_OF_WEEKS_IN_NFL }, (_, index) => (
          <WeekAccordion key={index + 1} week={index + 1} user={user} />
        ))}
      </Box>
    </Modal>
  );
}
