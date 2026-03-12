import './App.css';
import Header from './components/header/Header';
import MoodButton from './components/buttons/MoodButton';
import ArticleViewer from './components/articles/ArticleViewer';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type IUser from './types/IUser';

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <ArticleViewer user={user} />
              <MoodButton />
            </>
          }/>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;