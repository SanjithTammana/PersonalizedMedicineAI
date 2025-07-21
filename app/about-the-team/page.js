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
          The brilliant minds behind the PersonalizedMedicine AI Assistant
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
              Hi, my name is Srihith Chennareddy, and I am a rising junior at Bellevue High School with a strong passion for computer science, artificial intelligence, and competitive programming. I was the first author on an IEEE-accepted research paper written in collaboration with researchers from Microsoft, where we developed a novel approach to reduce large AI/LLM training costs. I also earned 2nd place at the Washington State Science and Engineering Fair (WSSEF) and have earned 1st place at  CMU CMIMC programming competition. Outside academics, I compete on theTennis and Swim teams, received the Presidential Gold Volunteer Service Award for my leadership in community engagement and enjoy playing violin.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> 11th grade <br/>
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
              I&apos;m a rising junior at Peak to Peak Charter School in Boulder, Colorado, serving as co-coder for the VEX Robotics team. I&apos;ve completed computer science courses at the pre-AP level and am planning to learn AP content over the summer. My experience in robotics programming has given me practical skills in problem-solving and collaborative coding.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> 11th grade <br/>
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
              Hi, my name is Dhriti Sinha, and I am a high school student at STEM School Highlands Ranch, graduating in 2026, with a strong passion for computer science and artificial intelligence. I have taken over 17 advanced and college-level courses, including AP Computer Science A and Advanced Python Programming, and currently have a 4.493 weighted GPA. I have led and contributed to several award-winning STEM projects, including an AI-powered wildlife detection device that earned the Samsung Solve for Tomorrow State Winner title 2024 and the ICOET 2025 Student Innovators Award. Outside the classroom, I am active in honor societies, lead a Python club, and volunteer in literacy and outdoor education programs.
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
              I&apos;m Sanjith Tammana, a high school student passionate about technology with experience in software development, machine learning, and data analysis. During a research internship at UT Dallas, I developed predictive models to analyze football player transfer values. As a Headstarter Fellow, I built projects such as chatbots and inventory management systems, honing my problem-solving skills. I also contributed to Rayfield Systems, an AI-powered compliance platform for energy developers, where I developed machine learning models for energy consumption forecasting. My technical ability is further demonstrated in my role as the President and Founder of Prosper Technology Student Association. Additionally, as a Life Scout, I&apos;ve cultivated leadership abilities through mentoring and community conservation efforts, combining technical expertise with a dedication to meaningful solutions.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> 12th grade <br/>
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
              Hi, I&apos;m Eashan Tilaye, a rising sophomore at Stargate School, graduating in 2028. I have taken a bunch of computer science courses including AP Computer Science Principles. I&apos;ve worked on personal projects related to artificial intelligence and I have lots of experience using different python libraries.
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: '#20c997' }}>
              <strong>Grade:</strong> 10th grader <br/>
              <strong>School:</strong> Stargate
            </Typography>
          </TeamMemberBox>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default AboutTeamPage;