'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
  minHeight: '100vh',
  padding: theme.spacing(4),
}));

const TeamMemberBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0px 8px 16px rgba(0, 123, 255, 0.1)',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 24px rgba(0, 123, 255, 0.15)',
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #007bff, #20c997)',
  color: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0px 12px 24px rgba(0, 123, 255, 0.3)',
}));

const AboutTeamPage = () => {
  return (
    <MainContainer>
      <HeaderBox>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: 700, color: '#ffffff' }}
        >
          Meet Our Team
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          The brilliant minds behind Salus AI Medical Assistant
        </Typography>
      </HeaderBox>
      
      <Grid container spacing={4}>
        {/* Srihith Chennareddy */}
        <Grid item xs={12} sm={6} md={4}>
          <TeamMemberBox>
            <Typography variant="h5" gutterBottom sx={{ color: '#007bff', fontWeight: 600 }}>
              Srihith Chennareddy
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#495057' }}>
              I'm a rising junior at Bellevue High School with a strong background in computer science, having completed both AP Computer Science A and AP Computer Science Principles. I'm planning to take a Google AI course to expand my knowledge in artificial intelligence and deep learning. My goal is to deepen my understanding of machine learning and apply it to innovative projects.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> Rising Junior<br/>
              <strong>School:</strong> Bellevue High School
            </Typography>
          </TeamMemberBox>
        </Grid>

        {/* Michael Lu */}
        <Grid item xs={12} sm={6} md={4}>
          <TeamMemberBox>
            <Typography variant="h5" gutterBottom sx={{ color: '#007bff', fontWeight: 600 }}>
              Michael Lu
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#495057' }}>
              I'm a rising junior at Peak to Peak Charter School in Boulder, Colorado, serving as co-coder for the VEX Robotics team. I've completed computer science courses at the pre-AP level and am planning to learn AP content over the summer. My experience in robotics programming has given me practical skills in problem-solving and collaborative coding.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> Rising Junior<br/>
              <strong>School:</strong> Peak to Peak Charter School
            </Typography>
          </TeamMemberBox>
        </Grid>

        {/* Dhriti Sinha */}
        <Grid item xs={12} sm={6} md={4}>
          <TeamMemberBox>
            <Typography variant="h5" gutterBottom sx={{ color: '#007bff', fontWeight: 600 }}>
              Dhriti Sinha
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#495057' }}>
              I'm a 12th-grade student at STEM Highlands Ranch with experience in several personal coding projects. I've participated in creating innovative solutions and have developed strong programming skills. My passion for computer science drives me to continuously learn and apply new technologies.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> 12th grade<br/>
              <strong>School:</strong> STEM Highlands Ranch
            </Typography>
          </TeamMemberBox>
        </Grid>

        {/* Sanjith Tammana */}
        <Grid item xs={12} sm={6} md={4}>
          <TeamMemberBox>
            <Typography variant="h5" gutterBottom sx={{ color: '#007bff', fontWeight: 600 }}>
              Sanjith Tammana
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#495057' }}>
              I'm a rising senior at Prosper High School with extensive computer science coursework including AP CSA, Honors CS 1, and AP Weighted CS3. I've gained valuable experience through a research internship at UT Dallas StARLinG Lab and the Headstarter SWE Fellowship. My passion for technology extends to personal coding projects and continuous learning in software development.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> Rising senior<br/>
              <strong>School:</strong> Prosper High School
            </Typography>
          </TeamMemberBox>
        </Grid>

        {/* Eashan Tilaye */}
        <Grid item xs={12} sm={6} md={4}>
          <TeamMemberBox>
            <Typography variant="h5" gutterBottom sx={{ color: '#007bff', fontWeight: 600 }}>
              Eashan Tilaye
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#495057' }}>
              I'm a rising 10th grader at Stargate with a strong foundation in computer science, having completed AP Computer Science Principles. As the primary coder for my robotics team, I've gained hands-on experience with practical programming applications. I've developed several personal CS projects in Python and built basic AI models for simple tasks.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> Rising 10th grader<br/>
              <strong>School:</strong> Stargate
            </Typography>
          </TeamMemberBox>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default AboutTeamPage;