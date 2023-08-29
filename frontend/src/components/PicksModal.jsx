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
import { getStartingWeek, dates } from '../config/dates';

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

      console.log('selected option: ', selectedOption);
      console.log('picksByIndex: ', picksByIndex[pickKey]);

      // Check if the user has already made that selection for the current entry
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

    // Check if the current week the user is submitting is too late.
    if (Number(week) < getStartingWeek()) {
      toast.error(
        `Pick submitted too late for week ${week}.  The deadline was ${dates[
          week - 1
        ].format('MM/DD/YYYY h:mm A')}`,
        {
          theme: theme ? 'dark' : 'light',
        }
      );
      return;
    }
    // console.log(week, getStartingWeek(), week < getStartingWeek());

    dispatch(makePicks({ data, user, week }));

    toast.success(`Picks submitted for week ${week}.`, {
      theme: theme ? 'dark' : 'light',
    });

    navigate('/dashboard');
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
          {Array.from({ length: user.bullets }, (_, bulletCountIndex) => (
            <PickSelect
              key={bulletCountIndex}
              bulletCountIndex={bulletCountIndex}
              register={register}
              team={team}
              setTeam={setTeam}
              week={week}
              user={user}
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

const PickSelect = ({
  bulletCountIndex,
  register,
  team,
  setTeam,
  week,
  user,
}) => {
  const handleChange = (event) => {
    const updatedTeam = [...team];
    updatedTeam[bulletCountIndex] = event.target.value;
    setTeam(updatedTeam);
  };

  const { losers } = useSelector((state) => state.scores);

  // Determine if there is a bad selection in any previous week for this entry
  let hasBadPreviousSelection = false;
  for (let prevWeek = 1; prevWeek < week; prevWeek++) {
    if (losers[`week${prevWeek}`]?.includes(team[bulletCountIndex])) {
      hasBadPreviousSelection = true;
      break; // Exit the loop if a bad selection is found
    }
  }
  return (
    <FormControl
      id={`entry-${bulletCountIndex + 1}`}
      fullWidth
      className="select"
      disabled={hasBadPreviousSelection}
    >
      <InputLabel id={`demo-simple-select-label-${bulletCountIndex}`}>
        {`Entry ${bulletCountIndex + 1}`}
      </InputLabel>
      <Select
        {...register(`pick-${bulletCountIndex + 1}`)}
        labelId={`demo-simple-select-label-${bulletCountIndex}`}
        value={team[bulletCountIndex]}
        label={`Entry ${bulletCountIndex + 1}`}
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
