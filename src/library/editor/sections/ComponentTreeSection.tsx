import { TreeView } from "@mui/lab";
import { Box } from "@mui/material";
import { FC } from "react";
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import ElementTree from "../components/ElementTree";
import SaveComponentTreeSection from "./SaveComponentTreeSection";

const ComponentTreeSection: FC<Record<never, never>> = () => {
  return (
    <Box>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >
        <ElementTree parentId={null} />
      </TreeView>
      <SaveComponentTreeSection />
    </Box>
  );
};

export default ComponentTreeSection;