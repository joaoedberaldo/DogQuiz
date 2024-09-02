/* eslint-disable react/prop-types */
import React from "react";

export default function Question({ question, options, onAnswer }) {
  return (
    <div>
      {/* Display the question */}
      <h2>{question}</h2>
      
      {/* Map over the options array to create a button for each option */}
      {options.map(function (option) {
        return (
          <button
            key={option}  // Use the option value as the key for each button
            onClick={function () {
              onAnswer(option);  // Call the onAnswer function when the button is clicked, passing the option
            }}
          >
            {option}  {/* Display the option text on the button */}
          </button>
        );
      })}
    </div>
  );
}