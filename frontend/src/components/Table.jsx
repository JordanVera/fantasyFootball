import { useMemo } from 'react';

const Table = () => {
  const columns = useMemo(() => [
    {
      Header: 'name',
      accessor: 'name',
    },
    {
      Header: 'name',
      accessor: 'name',
    },
  ]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Player</th>
          <th scope="col">Week &nbsp;1</th>
          <th scope="col">Week &nbsp;2</th>
          <th scope="col">Week &nbsp;3</th>
          <th scope="col">Week &nbsp;4</th>
          <th scope="col">Week &nbsp;5</th>
          <th scope="col">Week &nbsp;6</th>
          <th scope="col">Week &nbsp;7</th>
          <th scope="col">Week &nbsp;8</th>
          <th scope="col">Week &nbsp;9</th>
          <th scope="col">Week 10</th>
          <th scope="col">Week 11</th>
          <th scope="col">Week 12</th>
          <th scope="col">Week 13</th>
          <th scope="col">Week 14</th>
          <th scope="col">Week 15</th>
          <th scope="col">Week 16</th>
          <th scope="col">Week 17</th>
          <th scope="col">Week 18</th>
          <th scope="col">Week 19</th>
          <th scope="col">Week 20</th>
          <th scope="col">Week 21</th>
          <th scope="col">Week 22</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  );
};
export default Table;
