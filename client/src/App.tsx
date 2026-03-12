import './App.css';
import Header from './components/header/Header';
import MoodButton from './components/buttons/MoodButton';
import ArticleViewer from './components/articles/ArticleViewer';
import LoginForm from './components/forms/LoginForm';
import { useState } from 'react';

interface IUser {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <>
      <Header />
      {/* Wrapper principal qui laisse la place au header */}
      <main className="main-content">
        <ArticleViewer user={user} />
         <MoodButton />
        <LoginForm setUser={setUser} />
      </main>
    </>
  );
}

export default App;