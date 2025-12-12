import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth, AuthProvider } from './context/AuthContext';
import { useQuiz, QuizProvider} from "./context/quizContext"
const theme = createTheme({
  palette: {
    background: {
      default: '#303f9f', // Light grey
      // Or use: default: '#1a1a1a' for dark background
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <BrowserRouter>
    <AuthProvider>
      <QuizProvider>
      <App />
      </QuizProvider>
    </AuthProvider>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

