import { useQuiz } from "../../context/quizContext";
import { Navbar } from "../../component/Navbar";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Container, Button, Paper, Grid } from "@mui/material";
import Confetti from "react-confetti"; 

export const Result = () => {
  const { score, quizDispatch, quizCategory } = useQuiz(); //
  const navigate = useNavigate();

  const MAX_SCORE = 5; 
  const isPerfectScore = score === MAX_SCORE;


  const handleRetakeQuiz = () => {
    quizDispatch({ type: "QUIT" }); 
    navigate("/quiz"); 
  };


  const handleGoHome = () => {
    quizDispatch({ type: "QUIT" });
    navigate("/"); 
  };

  return (
    <Fragment>
      {isPerfectScore && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <Navbar/>
      {/* Main container centered on the page */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: "center", 
            bgcolor: isPerfectScore ? "#f0f8ff" : "white" 
          }}
        >
          <Box mb={3}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                color: isPerfectScore ? '#300becff' : '#6D75F4' 
              }}
            >
              Quiz Results
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {quizCategory ? `Category: ${quizCategory}` : "Quiz Completed"}
            </Typography>
          </Box>
          
          {/* Score display area */}
          <Box mb={4} sx={{ border: 1, borderColor: '#ccc', borderRadius: 2, p: 2, bgcolor: '#e6e6fa' }}>
            <Typography variant="h4" component="p" sx={{ mb: 1 }}>
              Your Score
            </Typography>
            <Typography 
              variant="h2" 
              component="span" 
              sx={{ 
                fontWeight: 'extrabold', 
                color: isPerfectScore ? '#0c30d3ff' : '#6D75F4' 
              }}
            >
              {score}
            </Typography>
            {isPerfectScore && (
              <Typography variant="h6" color="#1e1e1fff" sx={{ mt: 1 }}>
                🎉 Perfect Score! Congratulations!
              </Typography>
            )}
          </Box>

          {/* Action buttons */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleRetakeQuiz} 
                sx={{ 
                  backgroundColor: '#6D75F4', 
                  '&:hover': { backgroundColor: '#5c63e2' },
                }}
              >
                Retake Quiz
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                size="large" 
                onClick={handleGoHome}
                sx={{ 
                  color: '#6D75F4', 
                  borderColor: '#6D75F4',
                }}
              >
                Go to Home
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};