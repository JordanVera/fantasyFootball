import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
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
import axios from 'axios';

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5555/api/picks/${week}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log('response.data =');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
          <MenuItem value={teamOption} key={teamOption}>
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

        {Array.from({ length: 18 }, (_, index) => (
          <WeekAccordion key={index + 1} week={index + 1} user={user} />
        ))}
      </Box>
    </Modal>
  );
}