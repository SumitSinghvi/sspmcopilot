import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Archive from './pages/Archive';
import Playground from './pages/Playground';
import FeatureList from './pages/FeatureList';
import SidePanel from './components/SidePanel';
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex'>
        <BrowserRouter>
        <SidePanel />
        <Routes>
          <Route path="/" element={<FeatureList />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
        </BrowserRouter>   
      </div>
    </ThemeProvider>
  )
}
