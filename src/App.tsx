import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from './components/Navigation';
import { AIAssistant } from './components/AIAssistant';
import { Home } from './pages/Home';
import { AllProjects } from './pages/AllProjects';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>

      <AIAssistant />

      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 transition-colors">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
