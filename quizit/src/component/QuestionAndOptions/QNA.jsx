import { useRef } from "react";
import { Box, Card, Typography, Button, Stack } from "@mui/material";
import { IconButton, Badge } from "@mui/material";
import CoinIcon from "../QuestionAndOptions/cartoongoldcoin.png";
import { useQuiz } from "../../context/quizContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const QuestionAndOptions = ({ quizData }) => {
  console.log(quizData);
  const currentQuiz = quizData;
  const { title, category, quiz } = currentQuiz;
  const { index, score, quizDispatch, selectedOption } = useQuiz();
  const navigate = useNavigate();
  const [animateCoin, setAnimateCoin] = useState(false);
  const [showCoinRain, setShowCoinRain] = useState(false);
  const [totalCoins, setTotalCoins] = useState(0);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const hasPlayedAnimation = useRef(false);
  useEffect(() => {
    if (
      !hasPlayedAnimation.current &&
      index === quiz.length - 1 &&
      selectedOption !== null &&
      score === quiz.length
    ) {
      hasPlayedAnimation.current = true;

      setAnimateCoin(true);

      setTimeout(() => {
        setTotalCoins((prev) => prev + score);
        setAnimateCoin(false);
        setShowCoinRain(true);

        const coins = Array.from({ length: 30 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 0.8,
          duration: 1.5 + Math.random() * 1.5,
          rotation: Math.random() * 720 - 360,
        }));
        setFloatingCoins(coins);

        setTimeout(() => {
          setShowCoinRain(false);
          setFloatingCoins([]);
        }, 3000);
      }, 1000);
    }
  }, [index, selectedOption, score, quiz.length]);

  const handleNextQuestionClick = () => {
    localStorage.setItem("index",index + 1)
    quizDispatch({ type: "RESET_OPTION" });
    if (index !== quiz.length - 1) {
      quizDispatch({
        type: "NEXT_QUESTION",
      });
    } else {
      quizDispatch({
        type: "SUBMIT",
      });
      navigate("/result");
    }
  };
  const handleAnswerClick = (optionId, isCorrect) => {
    quizDispatch({
      type: "SELECTED_OPTION",
      payload: {
        optionId,
        isCorrect,
      },
    });
  };
  const handleQuitClick = () => {
    quizDispatch({ type: "QUIT" });
    navigate("/");
  };
  useEffect(() => {
    localStorage.setItem("option",selectedOption)
    localStorage.setItem("score",score)
  })
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#373A98",
        padding: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Coin Rain Animation */}
      <AnimatePresence>
        {showCoinRain &&
          floatingCoins.map((coin) => (
            <motion.div
              key={coin.id}
              initial={{
                x: `${coin.x}vw`,
                y: -100,
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: coin.rotation,
                scale: [1, 1.2, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: coin.duration,
                delay: coin.delay,
                ease: "linear",
                type: "tween",
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <img
                src={CoinIcon}
                alt="coin"
                style={{
                  width: 40,
                  height: 40,
                  filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))",
                }}
              />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Total Coins Badge */}
      <Box
        sx={{
          position: "absolute",
          top: "90px",
          right: "30px",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          bgcolor: "#ffffff20",
          padding: "8px 16px",
          borderRadius: "20px",
          backdropFilter: "blur(6px)",
          boxShadow: "0 0 10px #ffffff20",
        }}
      >
        <img src={CoinIcon} alt="coin" style={{ width: 28, height: 28 }} />
        <Typography
          sx={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Total Coins: {totalCoins}
        </Typography>
      </Box>

      {/* Animated Coin flying from score to badge */}
      <AnimatePresence>
        {animateCoin && (
          <motion.div
            initial={{
              position: "fixed",
              bottom: "35%",
              right: "50%",
              transform: "translate(50%, 50%)",
              zIndex: 3000,
            }}
            animate={{
              right: "30px",
              top: "90px",
              bottom: "auto",
              transform: "translate(0, 0)",
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 1,
              ease: [0.43, 0.13, 0.23, 0.96],
              type: "tween",
            }}
            style={{
              pointerEvents: "none",
            }}
          >
            <motion.img
              src={CoinIcon}
              alt="flying coin"
              style={{ width: 40, height: 40 }}
              animate={{
                rotate: [0, 360, 720],
                scale: [1, 1.3, 1],
              }}
              transition={{
                type: "tween",
                duration: 1,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Card
        sx={{
          width: "500px",
          background: "#20214A",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {/* Category Title */}
        <Typography
          variant="h5"
          sx={{
            bgcolor: "#3B3EAB",
            padding: "8px 20px",
            borderRadius: "10px",
            display: "inline-block",
            mb: 2,
            fontWeight: "bold",
          }}
        >
          {category}
        </Typography>

        {/* Subcategory */}
        <Typography
          variant="subtitle1"
          sx={{
            mt: 0.5,
            mb: 2,
            opacity: 0.8,
            fontSize: "16px",
          }}
        >
          {title}
        </Typography>

        {/* Question Number + Score */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            px: 1,
          }}
        >
          <Typography>
            Questions: {index + 1}/{quiz.length}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>Score: {score}</Typography>
            <motion.img
              src={CoinIcon}
              alt="coin"
              style={{ width: "28px", height: "28px", objectFit: "contain" }}
              animate={{
                rotate: selectedOption !== null ? [0, 15, -15, 0] : 0,
                scale: selectedOption !== null ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </Box>
        </Box>

        {/* Question */}
        <Typography sx={{ mb: 3, fontSize: "18px" }}>
          Q{index + 1} - {quiz[index].question}
        </Typography>

        {/* Options */}
        <Stack spacing={2}>
          {quiz[index].options.map(({ id, option, isCorrect }) => (
            <motion.div
              key={id}
              whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
              whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
            >
              <Button
                onClick={() => handleAnswerClick(id, isCorrect)}
                disabled={selectedOption !== null}
                fullWidth
                variant="contained"
                sx={{
                  bgcolor:
                    selectedOption === null
                      ? "#373A98"
                      : isCorrect
                      ? "#2ecc71"
                      : selectedOption === id
                      ? "#e74c3c"
                      : "#373A98",
                  "&.Mui-disabled": {
                    bgcolor: isCorrect
                      ? "#2ecc71"
                      : selectedOption === id
                      ? "#e74c3c"
                      : "#373A98",
                    opacity: 1,
                    color: "#fff",
                  },
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                    type: "tween",
                  },
                }}
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </Stack>

        {/* Bottom Buttons */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 4, justifyContent: "center" }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleQuitClick}
              variant="contained"
              sx={{
                bgcolor: "#BD4B76",
                textTransform: "none",
                px: 4,
                "&:hover": { bgcolor: "#D05B88" },
              }}
            >
              Quit
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNextQuestionClick}
              variant="contained"
              sx={{
                bgcolor: "#6D75F4",
                textTransform: "none",
                px: 4,
                "&:hover": { bgcolor: "#8990FF" },
              }}
            >
              {index === quiz.length - 1 ? "Submit" : "Next Question"}
            </Button>
          </motion.div>
        </Stack>
      </Card>
    </Box>
  );
};
