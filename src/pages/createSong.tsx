import { useState } from 'react';
import { createSong } from '../services/songsService';

export default function CreateSong() {
  const [songName, setSongName] = useState('');
  const [songPath, setSongPath] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newSong = {
        song_name: songName,
        song_path: songPath,
      };
      await createSong(newSong);
      alert('Canción creada exitosamente!');
    } catch (error) {
      console.error('Error creating song:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear una Nueva Canción</h2>
      <label>
        Nombre:
        <input
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Ruta:
        <input
          type="text"
          value={songPath}
          onChange={(e) => setSongPath(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Crear</button>
    </form>
  );
}
