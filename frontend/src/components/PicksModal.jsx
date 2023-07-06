import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

const WeekAccordion = ({ week, user, picksByIndex }) => {
  const theme = useSelector((state) => state.theme.theme);
  const { register, handleSubmit } = useForm();
  const [team, setTeam] = useState(Array(user.bullets).fill(''));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    for (let index = 0; index < user.bullets; index++) {
      const pickKey = `pick-${index + 1}`;
      const selectedOption = data[pickKey];

      console.log('picksByIn: ', selectedOption);
      console.log('picksByIndex: ', picksByIndex[pickKey]);

      if (selectedOption && picksByIndex[pickKey]?.includes(selectedOption)) {
        console.log(
          `Option ${selectedOption} already selected in another pick.`
        );

        toast.error(
          `Option ${selectedOption} already selected in entry ${index + 1}.`,
          {
            theme: theme ? 'dark' : 'light',
          }
        );
        return;
      }
    }

    dispatch(makePicks({ data, user, week }));
    toast.success(`Picks submitted for week ${week}`, {
      theme: theme ? 'dark' : 'light',
    });

    navigate('/dashboard');

    // window.location.reload(false);
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
        {`Entry ${index + 1}`}
      </InputLabel>
      <Select
        {...register(`pick-${index + 1}`)}
        labelId={`demo-simple-select-label-${index}`}
        value={team[index]}
        label={`Entry ${index + 1}`}
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

  const { user, users } = useSelector((state) => state.auth);
  // const { users, user } = useSelector((state) => state.auth);
  // const user = users.find()

  const [picksByIndex, setpicksByIndex] = useState({});

  useEffect(() => {
    const userPicks = user?.picks;

    if (userPicks) {
      console.log({ userPicks });
      const userPicksDS = userPicks.reduce((acc, pick) => {
        const picks = Object.values(pick)[0]; // Get the picks object

        Object.keys(picks).forEach((pickKey) => {
          if (!acc[pickKey]) {
            acc[pickKey] = []; // Initialize the array for the pick key if it doesn't exist
          }

          acc[pickKey].push(picks[pickKey]); // Push the pick value into the corresponding array
        });

        return acc;
      }, {});

      setpicksByIndex(userPicksDS);
    }
  }, [user]);

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
          <WeekAccordion
            key={index + 1}
            week={index + 1}
            user={user}
            picksByIndex={picksByIndex}
          />
        ))}
      </Box>
    </Modal>
  );
}
