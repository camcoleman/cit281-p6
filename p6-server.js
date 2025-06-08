const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let songs = [
  {
    id: 1,
    title: "Billie Jean",
    artist: "Michael Jackson",
    instruments: ["synthesizer", "drum machine", "bass guitar"]
  },
  {
    id: 2,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    instruments: ["electric guitar", "drums", "bass"]
  }
];

let currentId = 3;

// GET all songs
app.get('/songs', (req, res) => {
  res.json({ success: true, data: songs });
});

// POST a new song
app.post('/songs', (req, res) => {
  const { title, artist, instruments } = req.body;
  if (!title || !artist || !Array.isArray(instruments)) {
    console.error('Invalid song data');
    return res.status(400).json({ success: false, error: 'Invalid song data' });
  }

  const newSong = { id: currentId++, title, artist, instruments };
  songs.push(newSong);
  res.status(201).json({ success: true, data: newSong });
});

// PUT update a song
app.put('/songs/:id', (req, res) => {
  const { id } = req.params;
  const { title, artist, instruments } = req.body;
  const song = songs.find(s => s.id === parseInt(id));

  if (!song) {
    console.error('Song not found');
    return res.status(404).json({ success: false, error: 'Song not found' });
  }

  if (title) song.title = title;
  if (artist) song.artist = artist;
  if (Array.isArray(instruments)) song.instruments = instruments;

  res.json({ success: true, data: song });
});

// DELETE a song
app.delete('/songs/:id', (req, res) => {
  const { id } = req.params;
  const index = songs.findIndex(s => s.id === parseInt(id));

  if (index === -1) {
    console.error('Song not found for deletion');
    return res.status(404).json({ success: false, error: 'Song not found' });
  }

  const deleted = songs.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

// 404 handler
app.use((req, res) => {
  console.error('404 Not Found:', req.originalUrl);
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
