import { TreeView } from "@mui/lab";
import { Box } from "@mui/material";
import { FC } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ElementTree from "../components/ElementTree";
import SaveComponentTreeSection from "./SaveComponentTreeSection";

const ComponentTreeSection: FC<Record<never, never>> = () => {
  return (
    <Box>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <ElementTree parentId={null} />
      </TreeView>
      <SaveComponentTreeSection />
    </Box>
  );
};

export default ComponentTreeSection;