import React, { useState } from 'react';
import accents from 'remove-accents';

import './App.scss';

import Search from './components/Search';
import Word from './components/Word';

import icon from './icon.jpg';
import words from './data.json';

const Info = () => (
  <div className="info">
    <span>
      <a href="https://github.com/sjdonado" target="_blank" rel="noopener noreferrer">Juan Rodriguez</a>
      {' y '}
      <a href="https://github.com/jvalenciae" target="_blank" rel="noopener noreferrer">Javier Valencia</a>
    </span>
    <span>Universidad del Norte</span>
  </div>
);

const Title = () => (
  <>
    <img
      className="icon"
      src={icon}
      alt="Bailarina - Carnaval de Barranquilla, Colombia | Ilustración Andrés Urquina Sánchez"
    />
    <div className="title">
      <h1>Monocuco</h1>
      <h4>Diccionario de palabras costeñas</h4>
    </div>
  </>
);

function App() {
  const [filteredWords, setFilteredWords] = useState(words);
  const [currentWord, setCurrentWord] = useState('');

  const handleUpdate = (word) => {
    const parsedWord = accents.remove(word).toLowerCase();
    setFilteredWords(words.filter(({ text }) => {
      const parsedText = accents.remove(text).toLocaleLowerCase();
      return parsedText.includes(parsedWord);
    }));
    setCurrentWord(word);
  };

  return (
    <div className="body-top-highlight">
      <Info />
      <div className="navigation-wrapper">
        <Title />
        <Search
          word={currentWord}
          onUpdateWord={handleUpdate}
        />
        <span>
          {`Número total de palabras encontradas: ${filteredWords.length}`}
        </span>
      </div>
      <div className="content-wrapper">
        {filteredWords.map((word) => (
          <Word
            key={word.text}
            word={word}
            currentWord={currentWord}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
