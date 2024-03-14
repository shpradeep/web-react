import { Routes, Route } from 'react-router-dom';
import Header from './component/common/Header';
import Home from './component/Home';
import UserData from './component/UserData';
import Adduser from './component/Adduser';

function App() {
  return (
    <div className="App">
      <div className='leftPanel'>
        <Header />
      </div>
      <div className='rightPanel'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userdata" element={<UserData />} />
          <Route path="/adduser" element={<Adduser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
