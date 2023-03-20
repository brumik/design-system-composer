import { Box, Typography } from "@mui/material";
import { FC } from "react";
import AddElementButton from "../components/AddElementButton";

const RootElementSection: FC<Record<never, never>> = () => (
  <Box>
    <Typography variant='caption'>
      Append an new element to the root: (you probably want to append to YOUR root component)
    </Typography>
    <Box sx={{ marginTop: 3 }}>
      <AddElementButton />
    </Box>
  </Box>
);

export default RootElementSection;
