import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'

const App = () => {
  return (
    <Router>
    <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/chat' element={<Chat />}  />
    </Routes>
    </Router>
  );
}
  export default App;




// function App() {
//   return (
//     <h1>hello</h1>
//   );
// }

// export default App;
