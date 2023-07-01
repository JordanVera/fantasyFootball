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

  const createTableRows = () => {
    let content = [];

    users.map((user) => {
      for (let i = 1; i <= user.bullets; i++) {
        content.push(
          <TableRow key={`${user.name}-${i}`}>
            <TableCell component="th" scope="pick">
              {`${user.name}-${i}`}
            </TableCell>
            <TableCell component="td">
              {user.picks[0][`week-${1}`][`pick-1`] || ''}
            </TableCell>
          </TableRow>
        );
      }
    });

    return content;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>{createTableHeaders()}</TableRow>
        </TableHead>
        <TableBody>{createTableRows()}</TableBody>
      </Table>
    </TableContainer>
  );
}
