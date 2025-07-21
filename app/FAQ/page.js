'use client';

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  Paper,
  Alert,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SecurityIcon from '@mui/icons-material/Security';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WarningIcon from '@mui/icons-material/Warning';

// Styled components
const FAQContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
  minHeight: '100vh',
  paddingTop: '2rem',
  paddingBottom: '2rem',
}));

const HeaderSection = styled(Paper)(({ theme }) => ({
  padding: '3rem 2rem',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  color: '#ffffff',
  marginBottom: '2rem',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
}));

const CategorySection = styled(Box)(({ theme }) => ({
  marginBottom: '2rem',
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: '1rem',
  borderRadius: '12px !important',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #dee2e6',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: '0 0 1rem 0',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  minHeight: '64px',
  '&.Mui-expanded': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#ffffff',
  },
  '&:hover': {
    backgroundColor: '#f8f9fa',
  },
  '& .MuiAccordionSummary-content': {
    margin: '16px 0',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#007bff',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: '1.5rem',
  borderTop: '1px solid #dee2e6',
  borderBottomLeftRadius: '12px',
  borderBottomRightRadius: '12px',
}));

const ImportantNote = styled(Alert)(({ theme }) => ({
  marginBottom: '2rem',
  borderRadius: '12px',
}));

const FAQPage = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = {
    general: {
      title: 'General Usage',
      icon: <HelpOutlineIcon />,
      questions: [
        {
          question: 'What is this AI Medical Assistant?',
          answer: 'Our AI Medical Assistant is designed to help you understand common, non-emergency symptoms and provide over-the-counter (OTC) treatment recommendations. It covers three treatment approaches: conventional medicine (allopathy), homeopathic remedies, and naturopathic solutions.',
        },
        {
          question: 'How do I use the treatment mode switches?',
          answer: 'You can switch between different treatment modes at any time during your conversation:\n\n• General Mode: Get recommendations across all treatment types\n• Allopathy Mode: Focus on conventional OTC medications\n• Homeopathy Mode: Get homeopathic remedy suggestions\n• Naturopathy Mode: Explore natural and herbal treatments\n\nSimply click the mode buttons at the top of the chat interface.',
        },
        {
          question: 'What information should I provide about my symptoms?',
          answer: 'For the most accurate recommendations, please include:\n\n• Description of your symptoms\n• How long you&apos;ve had them\n• Severity level (mild, moderate, severe)\n• Your age range\n• Any current medications you&apos;re taking\n• Known allergies\n• Any relevant medical history',
        },
        {
          question: 'Can I switch treatment modes during a conversation?',
          answer: 'Yes! You can switch between treatment modes at any point during your conversation. The assistant will acknowledge the change and adjust its recommendations accordingly while maintaining the context of your symptoms.',
        },
      ],
    },
    safety: {
      title: 'Safety & Limitations',
      icon: <SecurityIcon />,
      questions: [
        {
          question: 'When should I call 911 or seek emergency care?',
          answer: 'Seek immediate emergency care for:\n\n• Severe chest pain or difficulty breathing\n• Signs of stroke (facial drooping, arm weakness, speech difficulty)\n• Severe allergic reactions\n• Loss of consciousness\n• Severe bleeding or trauma\n• High fever with severe symptoms\n• Any life-threatening situation\n\nThis assistant is NOT for emergency situations.',
        },
        {
          question: 'What are the limitations of this AI assistant?',
          answer: 'Important limitations:\n\n• Cannot diagnose serious medical conditions\n• Cannot prescribe prescription medications\n• Cannot replace professional medical advice\n• Should not be used for emergency situations\n• Recommendations are for common, minor symptoms only\n• Cannot interpret lab results or medical tests',
        },
        {
          question: 'Is this a substitute for seeing a doctor?',
          answer: 'No, this assistant is not a substitute for professional medical care. Always consult with a healthcare provider for:\n\n• Serious or persistent symptoms\n• Chronic health conditions\n• Prescription medications\n• Medical diagnoses\n• Symptoms that worsen or don&apos;t improve\n• Any concerns about your health',
        },
        {
          question: 'How accurate are the recommendations?',
          answer: 'While our AI provides evidence-based suggestions for common symptoms, accuracy can vary. The recommendations are based on general medical knowledge and should be verified with healthcare professionals. Individual responses to treatments can differ significantly.',
        },
      ],
    },
    treatments: {
      title: 'Treatment Approaches',
      icon: <MedicalServicesIcon />,
      questions: [
        {
          question: 'What is Allopathic Medicine?',
          answer: 'Allopathic medicine refers to conventional, science-based medical treatments. In our context, this includes:\n\n• FDA-approved over-the-counter medications\n• Evidence-based pharmaceutical solutions\n• Medications like Tylenol, Advil, Benadryl, etc.\n• Clear dosage instructions and contraindications\n• Information about drug interactions',
        },
        {
          question: 'What is Homeopathic Medicine?',
          answer: 'Homeopathy is a system of alternative medicine based on the principle of "like cures like." Our recommendations include:\n\n• Homeopathic remedies like Oscillococcinum, Arnica montana\n• Different potencies and dosing schedules\n• Traditional homeopathic principles\n• Remedy selection based on symptom patterns\n\nNote: Homeopathic treatments are not FDA-evaluated for effectiveness.',
        },
        {
          question: 'What is Naturopathic Medicine?',
          answer: 'Naturopathic medicine focuses on natural healing and prevention. Our suggestions include:\n\n• Herbal remedies and botanical medicines\n• Essential oils and aromatherapy\n• Dietary adjustments and nutritional supplements\n• Lifestyle modifications\n• Natural healing approaches\n\nAlways research quality and source of natural products.',
        },
        {
          question: 'Can I combine different treatment approaches?',
          answer: 'While you can explore different treatment modes, be cautious about combining treatments:\n\n• Some herbs can interact with medications\n• Essential oils may cause reactions\n• Always consult a healthcare provider before combining treatments\n• Inform your doctor about all supplements and remedies you&apos;re using\n• Start with one approach at a time when possible',
        },
      ],
    },
  };

  return (
    <FAQContainer>
      <Container maxWidth="lg">
        <HeaderSection elevation={0}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#ffffff' }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, color: '#ffffff' }}>
            Everything you need to know about using our AI Medical Assistant
          </Typography>
        </HeaderSection>

        <ImportantNote severity="warning" icon={<WarningIcon />}>
          <Typography variant="h6" gutterBottom>
            Important Medical Disclaimer
          </Typography>
          <Typography>
            This AI assistant provides information only and is not a substitute for professional medical advice,
            diagnosis, or treatment. For emergencies, call 911 immediately. Always consult with qualified
            healthcare professionals for medical concerns.
          </Typography>
        </ImportantNote>

        {Object.entries(faqData).map(([category, data]) => (
          <CategorySection key={category}>
            <CategoryHeader>
              {data.icon}
              <Typography variant="h4" component="h2" style={{ marginLeft: '1rem', color: '#007bff' }}>
                {data.title}
              </Typography>
            </CategoryHeader>

            {data.questions.map((item, index) => (
              <StyledAccordion
                key={`${category}-${index}`}
                expanded={expanded === `${category}-${index}`}
                onChange={handleChange(`${category}-${index}`)}
              >
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      color: '#212529',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}
                  >
                    {item.question}
                  </Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <Typography
                    sx={{
                      whiteSpace: 'pre-line',
                      lineHeight: 1.6,
                      color: '#495057',
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    {item.answer}
                  </Typography>
                </StyledAccordionDetails>
              </StyledAccordion>
            ))}
          </CategorySection>
        ))}

        <Divider style={{ margin: '3rem 0 2rem 0' }} />

        <Paper style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
          <Typography variant="h5" gutterBottom color="primary">
            Still Have Questions?
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '1rem' }}>
            If you have additional questions about using our AI Medical Assistant,
            remember that for any health concerns, it&apos;s always best to consult with a qualified healthcare professional.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Chip
                label="For Emergencies: Call 911"
                color="error"
                variant="filled"
                style={{ fontSize: '1rem', padding: '0.5rem' }}
              />
            </Grid>
            <Grid item>
              <Chip
                label="Consult Your Doctor"
                color="primary"
                variant="outlined"
                style={{ fontSize: '1rem', padding: '0.5rem' }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </FAQContainer>
  );
};

export default FAQPage;