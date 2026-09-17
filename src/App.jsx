import {Routes,Route} from 'react-router'
import Deshboard  from "./pages/Deshboard";
import Alltask from './pages/Alltask';
import Setting from './pages/Setting';
import Sidebar from './components/layout/Sidebar';

function App() {

  return (
    <>  
      <Sidebar/>
      <Routes>
          <Route path="/" element={<Deshboard/>}/>
          <Route path="/Alltask" element={<Alltask/>}/>
          <Route path="/Setting" element={<Setting/>}/>
      </Routes>
    </>
  )
}

export default App
