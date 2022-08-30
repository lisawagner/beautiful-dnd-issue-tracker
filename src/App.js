import { Routes, Route } from 'react-router-dom'
import { IssueBoard } from './features/issues'
import { Layout } from './components'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IssueBoard />} />
      </Route>
      
    </Routes>
  );
}

export default App;
