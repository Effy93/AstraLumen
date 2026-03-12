// App.tsx
import './App.css'
import Header from './components/header/Header'
import MoodButton from './components/buttons/MoodButton'
import ArticleViewer from './components/articles/ArticleViewer'

function App() {
  return (
    <>
      <Header />
      <MoodButton />
      <ArticleViewer />
    </>
  )
}

export default App