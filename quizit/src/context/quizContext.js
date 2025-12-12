import { createContext,useContext, useEffect, useReducer} from "react"
import { quizReducer } from "../reducer/QuizReducer"
import { QuizCard } from "../component/QuizCard/QuizCard"

const initialState = {
  index: 0,
  score: 0,
  quizCategory: "",
  selectedOption: null,
  selectedIsCorrect: null,
  searchQuery: ""
};

const QuizContext = createContext()
const QuizProvider = ({children}) => {
    const [{ index, score, quizCategory,selectedOption,searchQuery,selectedIsCorrect},quizDispatch] = useReducer(quizReducer,initialState)
    useEffect(() => {
        const currentIndex = Number(localStorage.getItem("index"))
        const currentScore = Number(localStorage.getItem("score"))
        const currentOption = localStorage.getItem("option")
        const currentCategory = localStorage.getItem("subcategory")
        quizDispatch({
            type: "INITIAL_STATE",
            payload: { currentIndex, currentOption, currentScore, currentCategory }
        })
    },[]) 
    return (
        <QuizContext.Provider value={{index, score, quizCategory,selectedOption,selectedIsCorrect,searchQuery,quizDispatch}}>
            {children}
        </QuizContext.Provider>
    )
}
const useQuiz = () => useContext(QuizContext)
export  { useQuiz, QuizProvider}