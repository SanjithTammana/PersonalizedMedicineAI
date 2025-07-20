'use client';

import React from 'react';
import { Box, Typography, Container, Paper, Button, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ScienceIcon from '@mui/icons-material/Science';
import ChatIcon from '@mui/icons-material/Chat';
import SecurityIcon from '@mui/icons-material/Security';

// Global styles for smooth scrolling
const GlobalStyles = styled('div')(() => ({
  'html, body': {
    scrollBehavior: 'smooth',
  },
}));

// Styled components
const Background = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
  minHeight: '100vh',
  padding: theme.spacing(6, 0),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  color: '#ffffff',
  textAlign: 'center',
  padding: theme.spacing(8, 3),
  borderRadius: '20px',
  boxShadow: '0px 12px 24px rgba(0, 123, 255, 0.3)',
  width: '95%',
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: theme.spacing(6),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 16px 32px rgba(0, 123, 255, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 2),
  },
}));

const ContentBox = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  width: '95%',
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: '12px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  minHeight: '300px', // Ensure consistent height
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const HowItWorksStep = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const List = styled('ul')(({ theme }) => ({
  paddingLeft: 0,
  listStyle: 'none',
  textAlign: 'left',
  margin: 0,
  '& li': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '&::before': {
      content: '"✓"',
      color: '#28a745',
      marginRight: theme.spacing(1.5),
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& li': {
      fontSize: '0.9rem',
    },
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #28a745, #20c997)',
  color: '#ffffff',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  padding: theme.spacing(1.5, 4),
  borderRadius: '25px',
  transition: 'all 0.3s ease',
  boxShadow: '0px 4px 8px rgba(40, 167, 69, 0.3)',
  marginTop: theme.spacing(2),
  '&:hover': {
    background: 'linear-gradient(135deg, #20c997, #17a2b8)',
    boxShadow: '0px 6px 12px rgba(40, 167, 69, 0.4)',
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: theme.spacing(1.2, 3),
  },
}));

const ScrollButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  fontSize: '1rem',
  textTransform: 'none',
  padding: theme.spacing(1, 3),
  borderRadius: '25px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  marginTop: theme.spacing(2),
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

export default function HomePage() {
  const router = useRouter();

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChatRedirect = () => {
    router.push('/chatbot');
  };

  const treatmentModes = [
    {
      icon: <LocalPharmacyIcon fontSize="large" style={{ color: '#007bff' }} />,
      title: 'Allopathic Medicine',
      description: 'FDA-approved over-the-counter medications and conventional treatments based on scientific evidence.',
      examples: 'Tylenol, Advil, Benadryl, Pepto-Bismol'
    },
    {
      icon: <LocalFloristIcon fontSize="large" style={{ color: '#28a745' }} />,
      title: 'Homeopathic Remedies',
      description: 'Traditional homeopathic treatments using diluted natural substances and time-tested principles.',
      examples: 'Oscillococcinum, Arnica montana, Belladonna'
    },
    {
      icon: <ScienceIcon fontSize="large" style={{ color: '#17a2b8' }} />,
      title: 'Naturopathic Solutions',
      description: 'Natural healing approaches including herbs, essential oils, and lifestyle modifications.',
      examples: 'Herbal teas, Essential oils, Dietary supplements'
    }
  ];

  return (
    <GlobalStyles>
      <Background>
        <Container maxWidth="xl">
          {/* Hero Section */}
          <HeroSection>
            <MedicalServicesIcon fontSize="large" style={{ marginBottom: '20px', fontSize: '3rem', color: '#ffffff' }} />
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>
              AI-Powered Medical Assistant
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ opacity: 0.9, marginBottom: '1.5rem', color: '#ffffff' }}>
              Get personalized OTC treatment recommendations across allopathy, homeopathy, and naturopathy
            </Typography>
            <ScrollButton onClick={() => handleScroll('how-it-works')}>
              Learn More
            </ScrollButton>
          </HeroSection>

          {/* How It Works Section */}
          <ContentBox id="how-it-works">
            <Typography
              variant="h3"
              gutterBottom
              style={{ fontWeight: 600, color: '#212529', marginBottom: '2rem' }}
            >
              How It Works
            </Typography>
            <Grid container spacing={4} style={{ marginBottom: '2rem' }} justifyContent="center">
              <Grid item xs={12} md={4}>
                <HowItWorksStep>
                  <ChatIcon fontSize="large" style={{ color: '#007bff', marginBottom: '1rem' }} />
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
                    Describe Your Symptoms
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Share details about your symptoms, duration, severity, and relevant health information
                  </Typography>
                </HowItWorksStep>
              </Grid>
              <Grid item xs={12} md={4}>
                <HowItWorksStep>
                  <MedicalServicesIcon fontSize="large" style={{ color: '#28a745', marginBottom: '1rem' }} />
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
                    Choose Treatment Mode
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Switch between allopathic, homeopathic, naturopathic, or general recommendations
                  </Typography>
                </HowItWorksStep>
              </Grid>
              <Grid item xs={12} md={4}>
                <HowItWorksStep>
                  <SecurityIcon fontSize="large" style={{ color: '#17a2b8', marginBottom: '1rem' }} />
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
                    Get Safe Recommendations
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Receive personalized OTC treatment suggestions with safety information
                  </Typography>
                </HowItWorksStep>
              </Grid>
            </Grid>
            <CTAButton onClick={handleChatRedirect}>
              Start Your Consultation
            </CTAButton>
          </ContentBox>

          {/* Treatment Approaches Section */}
          <ContentBox id="treatment-approaches">
            <Typography
              variant="h3"
              gutterBottom
              style={{ fontWeight: 600, color: '#212529', marginBottom: '2rem' }}
            >
              Treatment Approaches
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {treatmentModes.map((mode, index) => (
                <Grid item xs={12} md={4} key={index} style={{ display: 'flex' }}>
                  <FeatureCard style={{ width: '100%' }}>
                    <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box style={{ marginBottom: '1rem' }}>
                        {mode.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom style={{ fontWeight: 600, color: '#212529' }}>
                        {mode.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" style={{ flexGrow: 1, marginBottom: '1rem' }}>
                        {mode.description}
                      </Typography>
                      <Typography variant="body2" color="primary" style={{ fontStyle: 'italic' }}>
                        Examples: {mode.examples}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </ContentBox>

          {/* What We Can Help With Section */}
          <ContentBox>
            <Typography
              variant="h3"
              gutterBottom
              style={{ fontWeight: 600, color: '#212529', marginBottom: '2rem' }}
            >
              What We Can Help With
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary" style={{ fontWeight: 600 }}>
                  Common Symptoms We Address:
                </Typography>
                <List>
                  <li>Headaches and migraines</li>
                  <li>Common cold and flu symptoms</li>
                  <li>Minor cuts and scrapes</li>
                  <li>Digestive issues</li>
                  <li>Allergies and hay fever</li>
                  <li>Sleep problems</li>
                  <li>Minor skin irritations</li>
                  <li>Stress and anxiety</li>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="error" style={{ fontWeight: 600 }}>
                  Emergency Situations - Call 911:
                </Typography>
                <List>
                  <li>Severe chest pain or difficulty breathing</li>
                  <li>Signs of stroke or heart attack</li>
                  <li>Severe allergic reactions</li>
                  <li>Loss of consciousness</li>
                  <li>Severe bleeding or trauma</li>
                  <li>High fever with severe symptoms</li>
                  <li>Severe burns or injuries</li>
                  <li>Suicidal thoughts or behaviors</li>
                </List>
              </Grid>
            </Grid>
            <CTAButton onClick={handleChatRedirect} style={{ marginTop: '2rem' }}>
              Get Help Now
            </CTAButton>
          </ContentBox>
        </Container>
      </Background>
    </GlobalStyles>
  );
}