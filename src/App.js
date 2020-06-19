import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
      console.log(data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', { title: "Mobile com React Native", owner: 'Marcos Maia' });
    
    const newRepositories = [...repositories, response.data];
    
    setRepositories(newRepositories);
  };
  
  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const newRepositories = repositories.filter(repository => repository.id !== id);
      
      setRepositories(newRepositories);
    });
    
  };

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(({ title, id }) => 
        <li key={id}>
          {title}
          <button onClick={() => handleRemoveRepository(id)}>
            Remover
          </button>
        </li>) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;