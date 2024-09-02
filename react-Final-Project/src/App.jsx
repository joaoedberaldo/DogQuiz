import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import { UserProvider } from './components/UserContext';
import About from './components/About';

// Questions for the quiz with options
const questions = [
  {
    question: "What is your favorite color",
    options: ["Gray", "Blue", "Green", "Yellow"],
  },
  {
    question: "What is your favorite thing?",
    options: ["Tshirt", "Sock", "Pants", "Hat"],
  },
  {
    question: "What better relates to you?",
    options: ["Book", "Coffee", "Car", "Bed"],
  },
  {
    question: "How do you heal a wound?",
    options: ["Use medicine", "Use plants", "Lick the wound", "Time heals everything"],
  },
  {
    question: "What is the answer to life, the universe and everything?",
    options: ["42", "Love", "Insufficient Data For Meaningful Answer", "Chaos"],
  },
];

// Mapping of answers to corresponding dog breeds
const elements = {
  "Gray": "Labrador",
  "Blue": "Husky",
  "Green": "Akita",
  "Yellow": "Samoyed",

  "Tshirt": "Labrador",
  "Sock" : "Husky", 
  "Pants" : "Akita", 
  "Hat" : "Samoyed",

  "Book" : "Labrador", 
  "Coffee" : "Husky", 
  "Car" : "Akita", 
  "Bed" : "Samoyed",

  "Use medicine" : "Labrador", 
  "Use plants" : "Husky", 
  "Lick the wound" : "Akita", 
  "Time heals everything" : "Samoyed",

  "42" : "Labrador", 
  "Love" : "Husky", 
  "Chaos" : "Akita", 
  "Insufficient Data For Meaningful Answer" : "Samoyed",


};

// Mapping of dog breed names for fetching images
const keywords = {
  Labrador : "Labrador",
  Husky: "Husky",
  Akita : "Akita",
  Samoyed: "Samoyed"
};

function App () {
  // State to keep track of current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to store the user's answers
  const [answers, setAnswers] = useState([]);
  // State to store the user's name
  const [userName, setUserName] = useState('');
  // State to store the determined element (dog breed)
  const [element, setElement] = useState('');
  // State to store the fetched dog image
  const [dogImage, setdogImage] = useState(null);
  // State to store the breed type for displaying in the results
  const [breedtype, setBreed] = useState('');

  // Function to handle when the user selects an answer
  function handleAnswer(answer) {
    setAnswers([...answers, answer]); // Add answer to the list of answers
    setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
  };

  // Function to handle when the user submits their name in the form
  function handleUserFormSubmit(name) {
    setUserName(name); // Set the user's name in state
  };

  // Function to determine the most selected element (dog breed) based on the user's answers
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1; // Count occurrences of each breed
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b; // Return the breed with the highest count
    });
  };

   // Function to fetch a random image of the determined dog breed
  const fetchImage = async (breed) => {
    if (!breed) {
      console.error('No breed found for selected element');
      return;
    }
    try {
      const dogImageResponse = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`);
      const dogImageData = await dogImageResponse.json();
      setdogImage(dogImageData); // Set the fetched image data
      console.log('dogImage:', dogImageData);
      setBreed(breed); // Set the breed type
    } catch (error) {
      console.error('Error fetching dogImage:', error);
    }
  };

  // useEffect hook to determine the element and fetch the image when the quiz is completed
  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) { // Check if all questions have been answered
        const selectedElement = determineElement(answers); // Determine the dog breed based on answers
        setElement(selectedElement); // Set the determined breed in state
        fetchImage(keywords[selectedElement]); // Fetch the image of the determined breed
      }
    },
    [currentQuestionIndex, answers] // Dependencies: re-run this effect when these change
  );

  // Function to reset the quiz state (restart the quiz)
  const resetState = () => {
    setCurrentQuestionIndex(0); // Reset question index
    setAnswers([]); // Clear answers
    setUserName(''); // Clear user name
    setElement(''); // Clear selected element
    setdogImage(null); // Clear dog image
  };

  return (
    <Router>
      {/* Provide the UserContext to components */}    
    <UserProvider value={{ name: userName, setName: setUserName }}>
        <Header resetState={resetState}/>
        {/* Main application routes */}
        <Routes>
          {/* Route for the user form */}
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          {/* Route for the quiz questions */}
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer} // Handle answer selection
                />
              ) : (
                <Results element={element} dogImage={dogImage} breedtype={breedtype} resetState={resetState} />
              )
            }
          />
          {/* Route for the About page */}
          <Route path='/about' exact element={<About />} />
        </Routes>
    </UserProvider>
    </Router>
  );
}

export default App
