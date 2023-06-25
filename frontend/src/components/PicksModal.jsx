import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const style = {
  position: 'absolute',
  top: '90%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PicksAccordion = ({ week, user }) => (
  <Accordion key={week}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <h2>Accordion {week}</h2>
    </AccordionSummary>
    <AccordionDetails>
      {Array.from({ length: user.bullets }, (_, index) => (
        <Button>Click</Button>
      ))}
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Make Your Picks</h2>

          {createPicksAccordians(18, user)}
        </Box>
      </Modal>
    </div>
  );
}
