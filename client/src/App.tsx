import './App.css';
import Header from './components/header/Header';
import ArticleViewer from './components/articles/ArticleViewer';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type IUser from './types/IUser';
import Footer from './components/footer/Footer';

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
          
            </>
          }/>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;