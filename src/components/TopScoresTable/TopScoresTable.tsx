import { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import styles from "./TopScoresTable.module.scss";
import { Highscore } from "../../pages/TopScores/TopScores";

function Table({ columns, data }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { pageSize: 10 },
      },
      usePagination
    );

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function TopScoresTable(props: { highscores: Highscore[] }) {
  const { highscores } = props;

  const columns = useMemo(
    () => [
      {
        Header: "Imię",
        accessor: "username",
      },
      {
        Header: "Wynik",
        accessor: "score",
      },
    ],
    []
  );

  return <Table columns={columns} data={highscores} />;
}
