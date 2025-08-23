import { List, ListItem, Skeleton } from "@mui/material";

const ListSkeleton = () => (
  <List>
    {Array.from(new Array(6)).map((_, i) => (
      <ListItem key={i}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="70%" sx={{ ml: 2 }} />
      </ListItem>
    ))}
  </List>
);

export default ListSkeleton;
