import { Fragment } from "react";
import { Navbar } from "../../component/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { QuestionAndOptions } from "../../component/QuestionAndOptions/QNA";
import { API_ENDPOINTS } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/quizContext";
export const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const { quizCategory } = useQuiz();
  console.log(quizCategory);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        const response = await axios.get(API_ENDPOINTS.quiz, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("from quiz");
        const filteredData = response.data.data.filter(
          (quizItem) =>
            quizItem.subcategory === quizCategory ||
            quizItem.title === quizCategory
        );
        console.log(filteredData);
        setQuiz(filteredData);
      } catch (err) {
        console.error("Token verify error:", err);
        console.log("error: not getting data from quiz api");
        console.log(err);
      }
    })();
  }, [quizCategory]);
  return (
    <Fragment>
      <Navbar route="quiz" />
      {quiz && quiz.length > 0 && <QuestionAndOptions quizData={quiz[0]} />}
    </Fragment>
  );
};
