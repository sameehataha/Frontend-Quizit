import { Fragment, useEffect, useState } from 'react';
import { Navbar } from '../../component/Navbar'
import { QuizCard } from '../../component/QuizCard/QuizCard';
import { useQuiz } from '../../context/quizContext';
import { API_ENDPOINTS } from '../../config/api';
import axios from "axios"
import './Home.css'
export function Home() {
  const [categories, setCategories] = useState([])
  const { searchQuery } = useQuiz();
  useEffect(() => {
    (async () => {
      try{
        const response = await axios.get(API_ENDPOINTS.categories)
        setCategories(response.data.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[])
  const filteredCategories = categories.filter(category => {
  const query = searchQuery ? searchQuery.toLowerCase() : "";

  return (
    category.title.toLowerCase().includes(query) ||
    category.category.toLowerCase().includes(query) ||
    category.subcategory.toLowerCase().includes(query)
  );
});

  return (
    
    <Fragment>
      <Navbar route="home" />
      <main className='main'>
        {
          filteredCategories.length > 0 ? (
            filteredCategories.map(category => <QuizCard quizCategory={category} key={category.id} />)
          ) : (
            <p style={{ color: 'white' }}>No quizzes found matching your search: "{searchQuery}"</p>
          )
        }
      </main>
      </Fragment>
  );
}
