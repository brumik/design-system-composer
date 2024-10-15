import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useUserInteractionContext } from "../../Providers";

const SelectionSettingsSection: FC<Record<never, never>> = () => {
  const {
    selectingFromPreview,
    toggleSelectingFromPreview,
    highlightSelected,
    toggleHighlightSelected,
    highlightColor,
    setHighlightColor,
  } = useUserInteractionContext();

  return (
    <Box>
      <Typography variant="caption">
        Enable preview selecton to be able to click on an element in the Preview to select an element to edit.
        Please note that while this option is enable all onClick events are intercepted and prevetned.
      </Typography>
      <Box sx={{ marginTop: 1, marginBottom: 2, textAlign: 'center' }}>
        <Button
          variant={ selectingFromPreview ? 'contained' : 'outlined' }
          onClick={ () => toggleSelectingFromPreview() }
          size="small"
        >
          { selectingFromPreview ? 'Disable on click select' : 'Enable on click select'}
        </Button>
      </Box>
      <Typography variant="caption">
        You can enable higlight for the currently selected item. You will see visually in the preview
        a dotted border around the selected element. Please not this may break the desing a bit as
        it overrides the border propery as well as adding an extra 1px around the element which may make
        it look worse than it should be.
      </Typography>
      <Box sx={{ marginTop: 1 }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Grid>
            <Button
                variant={ highlightSelected ? 'contained' : 'outlined' }
                size="small"
                onClick={ () => toggleHighlightSelected() }
              >
              { highlightSelected ? 'Disable highlight' : 'Enable higlight' }
            </Button>
          </Grid>
          <Grid>
            { highlightSelected && (
              <input
                type='color'
                onChange={ (e) => setHighlightColor(e.target.value) }
                value={ highlightColor }
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SelectionSettingsSection;
