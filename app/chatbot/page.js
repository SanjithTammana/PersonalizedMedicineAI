'use client';

import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Paper,
} from '@mui/material';

// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 64px)',
  backgroundColor: '#ffffff',
  color: '#212529',
  overflow: 'hidden',
}));

const StickyToggleContainer = styled(Paper)(({ theme }) => ({
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e9ecef',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '16px',
  backgroundColor: '#f8f9fa',
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

const MessageBubble = styled(Box)(({ sender, theme }) => ({
  display: 'block',
  marginBottom: '12px',
  textAlign: sender === 'user' ? 'right' : 'left',
  '& div': {
    display: 'inline-block',
    padding: '12px 16px',
    borderRadius: '12px',
    background: sender === 'user' ? '#007bff' : '#ffffff',
    color: sender === 'user' ? '#ffffff' : '#212529',
    maxWidth: '75%',
    wordWrap: 'break-word',
    animation: 'fadeIn 0.3s ease-in-out',
    fontSize: '1rem',
    boxShadow:
      sender === 'user'
        ? '0 2px 8px rgba(0,123,255,0.2)'
        : '0 2px 8px rgba(0,0,0,0.1)',
    border: sender === 'user' ? 'none' : '1px solid #e9ecef',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

const BulletPoint = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '16px',
  marginBottom: '6px',
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  padding: '8px',
  fontSize: '0.9rem',
  border: '1px solid #e9ecef',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const BulletIcon = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  backgroundColor: '#007bff',
  borderRadius: '50%',
  marginRight: '8px',
  flexShrink: 0,
}));

const StepNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: '6px',
  fontSize: '1rem',
  color: '#007bff',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const RegularText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  marginBottom: '4px',
  lineHeight: 1.5,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #e9ecef',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#007bff',
  color: '#ffffff',
  borderRadius: '8px',
  textTransform: 'none',
  padding: '10px 20px',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  minWidth: '80px',
}));

const StyledToggleButton = styled(ToggleButton)(() => ({
  color: '#000000',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  padding: '8px 16px',
  margin: '0 4px',
  textTransform: 'none',
  fontWeight: 500,

  '&.Mui-selected': {
    backgroundColor: '#007bff',
    color: '#000000 !important',      // ← selected text is now black
    border: '1px solid #007bff',
    '&:hover': {
      backgroundColor: '#0056b3',
      color: '#000000 !important',    // ← hover-selected text is also black
    },
  },

  '&:hover': {
    backgroundColor: '#f8f9fa',
    color: '#000000 !important',
  },
  '&:not(.Mui-selected)': {
    color: '#000000 !important',
  },
}));

// Parse and format bot responses with step-by-step instructions and bullet points
const formatBotResponse = (text) => {
  const lines = text.split('\n');
  const formattedContent = [];

  lines.forEach((line, index) => {
    if (line.trim() === '') return; // Skip empty lines

    if (line.match(/^\d+\./)) {
      // If the line starts with a number (e.g., "1. Step")
      formattedContent.push(
        <StepNumber key={`step-${index}`}>{line.trim()}</StepNumber>
      );
    } else if (line.startsWith('-') || line.startsWith('•')) {
      // If the line is a bullet point
      formattedContent.push(
        <BulletPoint key={`bullet-${index}`}>
          <BulletIcon /> {line.slice(1).trim()}
        </BulletPoint>
      );
    } else {
      // Regular text
      formattedContent.push(
        <RegularText key={`text-${index}`}>{line.trim()}</RegularText>
      );
    }
  });

  return <>{formattedContent}</>;
};

// Main Chat Page Component
const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: 'bot',
      text: "Hello! I'm your AI medical assistant. I can help you with common, non-emergency symptoms and provide OTC treatment recommendations. You can switch between different treatment approaches using the buttons above. Please describe your symptoms, including duration, severity, and any relevant health information.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [treatmentMode, setTreatmentMode] = useState('general');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages,
          treatmentMode: treatmentMode,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error.');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.response || 'Error: No response.',
        },
      ]);
    } catch (error) {
      console.error('Error in chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text:
            "I apologize, but I'm having trouble processing your request. Please try again later or consult with a healthcare professional for immediate assistance.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleModeChange = (event, newMode) => {
    if (newMode && newMode !== treatmentMode) {
      setTreatmentMode(newMode);
      // Add a system message to indicate the mode change
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `I've switched to ${getModeDescription(
            newMode
          )} mode. I'll now focus my recommendations on ${
            newMode === 'general'
              ? 'all treatment approaches'
              : `${newMode} treatments`
          }. How can I help you?`,
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getModeTitle = (mode) => {
    const titles = {
      general: 'All Approaches',
      allopathy: 'Allopathic',
      homeopathy: 'Homeopathic',
      naturopathy: 'Naturopathic',
    };
    return titles[mode];
  };

  const getModeDescription = (mode) => {
    const descriptions = {
      general: 'general medical assistant',
      allopathy: 'conventional medicine',
      homeopathy: 'homeopathic medicine',
      naturopathy: 'naturopathic medicine',
    };
    return descriptions[mode];
  };

  return (
    <ChatContainer>
      {/* Sticky Toggle Container */}
      <StickyToggleContainer elevation={0}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#000000', fontWeight: 600, marginBottom: 2 }}
        >
          Treatment Mode
        </Typography>
        <ToggleButtonGroup
          value={treatmentMode}
          exclusive
          onChange={handleModeChange}
          sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <StyledToggleButton value="general">
            {getModeTitle('general')}
          </StyledToggleButton>
          <StyledToggleButton value="allopathy">
            {getModeTitle('allopathy')}
          </StyledToggleButton>
          <StyledToggleButton value="homeopathy">
            {getModeTitle('homeopathy')}
          </StyledToggleButton>
          <StyledToggleButton value="naturopathy">
            {getModeTitle('naturopathy')}
          </StyledToggleButton>
        </ToggleButtonGroup>
      </StickyToggleContainer>

      {/* Messages Container */}
      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble key={message.id} sender={message.sender}>
            <div>
              {message.sender === 'bot'
                ? formatBotResponse(message.text)
                : message.text}
            </div>
          </MessageBubble>
        ))}
        {isTyping && (
          <MessageBubble sender="bot">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={16} style={{ marginRight: '8px' }} />
              Typing...
            </div>
          </MessageBubble>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      {/* Input Container */}
      <InputContainer>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe your symptoms..."
          variant="outlined"
          fullWidth
          disabled={isTyping}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#ffffff',
            },
          }}
        />
        <StyledButton onClick={handleSubmit} disabled={isTyping || !input.trim()}>
          Send
        </StyledButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPage;
