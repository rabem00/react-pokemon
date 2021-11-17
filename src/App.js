import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {useEffect, useState, useMemo} from 'react';
import About from './components/About';
import Home from './components/Home';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredpokemon, setFilteredPokemon] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((pokemon, idx) => {
          return { ...pokemon, idx: idx + 1};
        });
        setPokemon({ ...data, results });
      });
    })

  useMemo(() => {
    if(text.length === 0) {
      setFilteredPokemon([]);
      return
    }
    setFilteredPokemon(()=>
      pokemon.results?.filter((pokemon)=> pokemon.name.includes(text))
    )
  }, [pokemon.results, text])

  return (
    <Router>
      <div className="p-14">
        <div className="flex flex-col items-center">
          <Link to="/">
              <header className="text-4xl text-yellow-700">Pokemon Picker</header>
          </Link>
       </div>
      </div>
      <div className="w-full flex justify-center">
        <input type="text" placeholder="Enter Pokemon Here" className="mt-10 p-2 boder-blue-500 border-2" onChange={($event)=> setText($event.target.value)}/>
      </div>
      <Routes>
        <Route path="/about/:slug" element={<About />} />
        <Route path="/" element={pokemon && <Home pokemon={filteredpokemon}/>} />
       </Routes>
    </Router>
  );
}

export default App;
