import './App.css';
import { useRoutes } from 'react-router';
import routes from './routes/routes';
function App() {
  const isLogin = localStorage.getItem('token') ? true : false;

  const content = useRoutes(routes({ isLogin }));

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
