import TodoList from './/components/TodoList';
import PageTodo from './/components/PageTodo';
import NotFound from './/components/NotFound';
import { Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<TodoList />} />
			<Route path="/task/:id" element={<PageTodo />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
