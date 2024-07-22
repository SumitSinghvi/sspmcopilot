import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Archive from './pages/Archive';
import Playground from './pages/Playground';
import FeatureList from './pages/FeatureList';
import SidePanel from './components/SidePanel';
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect, useState } from 'react';
import { getData } from './lib/utils';

export default function App() {
  const [archivedData, setArchivedData] = useState<any>(null);
  const [unArchivedData, setUnArchivedData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setUnArchivedData(result.filter((item: any) => item.Archive == false));
        setArchivedData(result.filter((item: any) => item.Archive == true));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex'>
        <BrowserRouter>
        <SidePanel />
        <Routes>
          <Route path="/" element={<FeatureList data={unArchivedData} />} />
          <Route path="/playground" element={<Playground data={unArchivedData}/>} />
          <Route path="/archive" element={<Archive data={archivedData}/>} />
        </Routes>
        </BrowserRouter>   
      </div>
    </ThemeProvider>
  )
}
