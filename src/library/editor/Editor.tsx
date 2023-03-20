import  { FC } from 'react';
import CompositionList from './sections/CompositionSection';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Typography } from '@mui/material';
import ComponentTreeSection from './sections/ComponentTreeSection';
import SelectionSettingsSection from './sections/SelectionSettingsSection';
import RootElementSection from './sections/RootElementSection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ElementEditorSection from './sections/ElementEditorSection';

const Editor: FC<Record<never, never>> = () => {
  return (
    <Card raised>
      <CardContent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Element select settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SelectionSettingsSection />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Root element</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RootElementSection />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Selected element editor</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ElementEditorSection />
          </AccordionDetails>
        </Accordion>
        
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Component tree</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ComponentTreeSection />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Component compositions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CompositionList />
          </AccordionDetails>
        </Accordion>        
      </CardContent>
    </Card>
)};

export default Editor;
