import { Link } from "react-router-dom"; 
import React from 'react';

export default function Header() {
  return (
    <>
            <div className="home">
                <div>
                <h1>Which type of Dog are you?</h1>
                <p>(based on completely random things)</p>
                </div>

                <div className="nav">
                    <Link to="/" className='links'>Home</Link>
                    <Link to="/quiz" className='links'>Quiz</Link>
                    <Link to="/about" className='links'>About</Link>
                </div>
            </div>
        </>
  );
}