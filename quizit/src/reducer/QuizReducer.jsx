export const quizReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIAL_STATE":
        return  {
          ...state,
          index: payload.currentIndex,
          score: payload.currentScore,
          selectedOption: payload.currentOption === "null" ? null : payload.currentOption,
          quizCategory: payload.currentCategory
        }
    case "CATEGORY":
      return {
        ...state,
        quizCategory: payload,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        index: state.index + 1,
      };
    case "SELECTED_OPTION":
      return {
        ...state,
        selectedOption: payload.optionId,
        selectedIsCorrect: payload.isCorrect,
        score: payload.isCorrect ? state.score + 1  : state.score
      };
    case "RESET_OPTION":
      return {
        ...state,
        selectedOption: null,
        selectedIsCorrect: null,
      };
    case "SUBMIT":
        return {
        ...state,
        selectedIsCorrect: null,
        }
      case "SEARCH_QUERY":
        return {
          ...state,
          searchQuery: payload,
        }
    case  "QUIT":
        return{
            ...state,
            index: 0,
            score: 0,
            selectedOption: null,
            selectedIsCorrect: null,
            searchQuery: "",
        }
    default:
      return state;
  }
};
