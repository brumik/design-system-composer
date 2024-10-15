import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useDataContext, useUserInteractionContext } from "../../Providers";
import AddCompositionButton from "./AddCompositionButton";
import AddElementButton from "./AddElementButton";
import ChildrenList from "./ChildrenList";

interface Props {
  propName: string
}

const NodeEditor: FC<Props> = ({
  propName
}) => {
  const { selectedElement } = useUserInteractionContext();
  const { getChildren } = useDataContext();

  // Early quit, should not happen at all
  if (!selectedElement)
    return null;

  return (
    <Box>
      <Typography variant='body1'>{propName}:</Typography>
      <ChildrenList
        elements={ getChildren(selectedElement.id, propName )}
      />
      <Box sx={{ marginY: 1}}>
        <AddElementButton parent={ { id: selectedElement.id, propName } } />
      </Box>
      <Box sx={{ marginY: 1}}>
        <AddCompositionButton parent={ { id: selectedElement.id, propName } } />
      </Box>
    </Box>
  );
};

export default NodeEditor;
