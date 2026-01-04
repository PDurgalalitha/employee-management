import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState} from './store/index.ts'

const App: React.FC = () =>{
  const count = useSelector((state: RootState) => state.employee.value);
  const dispatch = useDispatch();
  return (
    <p> sample</p>
  )
}

export default App; 
