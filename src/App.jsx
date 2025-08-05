import TodoList from './/components/TodoList';
import PageTodo from './/components/PageTodo';
import NotFound from './/components/NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<TodoList />} />
			<Route path="/task/:id" element={<PageTodo />} />
			<Route path="/404" element={<NotFound />} />
			<Route path="*" element={<Navigate to="/404" />} />
		</Routes>
	);
};

export default App;
