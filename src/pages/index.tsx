import { useEffect, useState } from 'react';
import { getSongs, createSong, deleteSong, updateSong } from '../services/songsService';

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState('');
  const [songPath, setSongPath] = useState('');
  const [selectedSong, setSelectedSong] = useState(null); // Canción seleccionada para actualizar

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const handleCreateSong = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSong = {
        song_name: songName,
        song_path: songPath,
      };
      await createSong(newSong);

      const updatedSongs = await getSongs();
      setSongs(updatedSongs);

      setSongName('');
      setSongPath('');
      alert('Canción creada exitosamente!');
    } catch (error) {
      console.error('Error creating song:', error);
    }
  };

  const handleDeleteSong = async (id_song: number) => {
    try {
      await deleteSong(id_song);

      const updatedSongs = songs.filter((song) => song.id_song !== id_song);
      setSongs(updatedSongs);

      alert('Canción eliminada exitosamente!');
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  // Manejar la selección de una canción para actualizar
  const handleSelectSong = (song: any) => {
    setSelectedSong(song);
    setSongName(song.song_name);
    setSongPath(song.song_path);
  };

  // Manejar la actualización de la canción seleccionada
  const handleUpdateSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSong) return;

    try {
      const updatedData = {
        song_name: songName,
        song_path: songPath,
      };
      await updateSong(selectedSong.id_song, updatedData);

      const updatedSongs = await getSongs();
      setSongs(updatedSongs);

      setSelectedSong(null);
      setSongName('');
      setSongPath('');
      alert('Canción actualizada exitosamente!');
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Canciones</h1>

      {/* Formulario para crear canciones */}
      <form onSubmit={handleCreateSong} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Crear una Nueva Canción</h2>
        <div className="mb-4">
          <label htmlFor="songName" className="block font-medium mb-1">
            Nombre de la canción
          </label>
          <input
            type="text"
            id="songName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="songPath" className="block font-medium mb-1">
            Ruta del archivo
          </label>
          <input
            type="text"
            id="songPath"
            value={songPath}
            onChange={(e) => setSongPath(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Canción
        </button>
      </form>

      {/* Formulario para actualizar canciones */}
      {selectedSong && (
        <form onSubmit={handleUpdateSong} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Actualizar Canción</h2>
          <div className="mb-4">
            <label htmlFor="updateSongName" className="block font-medium mb-1">
              Nuevo nombre de la canción
            </label>
            <input
              type="text"
              id="updateSongName"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="updateSongPath" className="block font-medium mb-1">
              Nueva ruta del archivo
            </label>
            <input
              type="text"
              id="updateSongPath"
              value={songPath}
              onChange={(e) => setSongPath(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Actualizar Canción
          </button>
        </form>
      )}

      {/* Lista de canciones */}
      <h2 className="text-xl font-semibold mb-2">Lista de Canciones</h2>
      <ul className="space-y-4">
        {songs.map((song) => (
          <li
            key={song.id_song}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium">🎵 {song.song_name}</p>
              <p className="text-sm text-gray-500">Reproducciones: {song.plays}</p>
              <audio controls className="mt-2">
                <source src={song.song_path} type="audio/mpeg" />
              </audio>
            </div>
            <div>
              <button
                onClick={() => handleSelectSong(song)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteSong(song.id_song)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
