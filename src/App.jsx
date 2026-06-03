import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Router from './routes/router.jsx';
import './index.css';
// import Home from './pages/home.jsx'; <-- You don't need this import here anymore!

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Global Navigation Header */}
        <Header />
        
        <main className="flex-grow">
          {/* The traffic cop that dynamically decides which page to show */}
          <Router /> 
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;