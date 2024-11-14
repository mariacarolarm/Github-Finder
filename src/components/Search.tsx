import { BsSearch } from "react-icons/bs";
import { useState, KeyboardEvent } from "react";
import classes from './Search.module.css';

type SearchProps = {
  loadUser: (username: string) => Promise<void>;
}

const Search = ({loadUser}: SearchProps) => {
  const [username, setUsername] = useState('');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      loadUser(username);
    }
  }

  return (
    <div className={classes.search}>
      <h2>Busque um usuario:</h2>
      <p>Conheca os melhores repositorios</p>
      <div className={classes.search_container}>
        <input 
        type="text" 
        placeholder="Digite o nome do usuario" 
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown} />
        <button onClick={() => loadUser(username)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
}

export default Search;