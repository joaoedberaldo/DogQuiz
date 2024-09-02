/* eslint-disable react/prop-types */
import React from "react";
import { UserContext } from './UserContext';

export default function Results({ element, dogImage, breedtype, resetState }) {
  // reference the context for the "name".
  const { name } = React.useContext(UserContext);

  // Check if name is null, undefined, or empty and replace it with "Anonymous"
  const displayName = name ? name : "Anonymous";

  return (
    <div className="dogImage">
      <p>
        <strong>{displayName}</strong>, you are a : 
      </p>
      {dogImage ? (
        <div >
          <h2>{breedtype}</h2>
          <img src={dogImage.message} alt='dogImage' />
        </div>
      ) : (
        <p>Loading.....</p>
      )}
       <button onClick={resetState} id='resetbtn'>Reset</button>
    </div>
  );
}