import Navbar from '@components/Navbar';
import TaskBody from '@components/TodoBoard';
import TodoDetailsPanel from '@components/TodoDetails';
import TodoListMenu from '@components/TodoLists';
import { useStore } from '@lib/TodoProvider';
import { useLayoutContext } from '@nextail/providers';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { selectedTodo } = useStore();
  const { leftDrawerOpen } = useLayoutContext();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white dark:bg-slate-700">
      <Navbar />
      <div className="flex h-full w-full overflow-hidden md:flex-row">
        {leftDrawerOpen ? <TodoListMenu /> : null}
        <TaskBody />
        {selectedTodo ? <TodoDetailsPanel /> : null}
      </div>
    </div>
  );
};

export default Home;
