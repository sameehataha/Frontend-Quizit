import { useNavigate } from "react-router-dom";
import { Card,CardMedia,CardContent,Typography,Button,Box, } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/quizContext";
export const QuizCard = ({ quizCategory }) => {
  const { image, title, category,subcategory, description } = quizCategory;
  const token = localStorage.getItem("token")
  const { quizDispatch } = useQuiz()
  const navigate = useNavigate()
  const handlePlayNowClick = () => {
    if(token) {
      quizDispatch({
        type:"CATEGORY",
        payload:subcategory
      })
      localStorage.setItem("subcategory", subcategory)
      navigate("/quiz")
    }else{
      navigate("/auth/login")
    }
  }
  return (
    <Card
      sx={{
        width: 320,
        height: 500,
        backgroundColor: "#3c3c99",
        borderRadius: 3,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        sx={{
          height: 250,
          borderRadius: 2,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ color: "white", padding: 0 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 0.5,
          }}
        >
          {category.name || category}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ mt: "auto" }}>
        <Button
          variant="contained"
          onClick={handlePlayNowClick}
          fullWidth
          sx={{
            paddingY: 1.3,
            backgroundColor: "#5865F2",
            ":hover": {
              backgroundColor: "#4752C4",
            },
            borderRadius: 2,
          }}
        >
          Play Now
        </Button>
      </Box>
    </Card>
  );
};
