import { useSelector } from 'react-redux';
import {
  TableRow,
  Paper,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@mui/material';

export default function MainTable() {
  const { users, user } = useSelector((state) => state.auth);

  const createTableHeaders = (_) => {
    let content = [<TableCell key={0}>Player</TableCell>];
    for (let i = 1; i <= 22; i++) {
      content.push(<TableCell key={i}>Week &nbsp;{i}</TableCell>);
    }
    return content;
  };

  const createTableRows = (_) => {
    let content = [];

    users.map((user) => {
      for (let i = 1; i <= user.bullets; i++) {
        content.push(
          <TableRow key={`${user.name}-${i}`}>
            <TableCell component="th" scope="pick">
              {`${user.name}-${i}`}
            </TableCell>

            {generatePickCells(user, i)}
          </TableRow>
        );
      }
    });

    return content;
  };

  const generatePickCells = (user, index) => {
    let content = [];

    for (let week = 1; week <= 22; week++) {
      const pickObj = user.picks.find((pick) => pick[`week-${week}`]);
      const pick = pickObj ? pickObj[`week-${week}`][`pick-${index}`] : '';

      content.push(
        <TableCell component="td" scope="pick" key={`pick-${week}`}>
          {pick}
        </TableCell>
      );
    }

    return content;
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>{createTableHeaders()}</TableRow>
        </TableHead>
        <TableBody>{createTableRows()}</TableBody>
      </Table>
    </TableContainer>
  );
}
