import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";

const TableSkeleton = () => (
  <Table>
    <TableHead>
      <TableRow>
        {[...Array(4)].map((_, i) => (
          <TableCell key={i}>
            <Skeleton variant="text" />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(4)].map((_, j) => (
            <TableCell key={j}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default TableSkeleton;
