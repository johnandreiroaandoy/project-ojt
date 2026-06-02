import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Router from './routes/router.jsx';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Header no longer needs activeTab state props */}
        <Header />
        
        <main className="flex-grow">
          <Router />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;