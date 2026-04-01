import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadsList from '../components/ThreadsList';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = useMemo(() => {
    const cats = threads
      .map((thread) => thread.category)
      .filter((cat) => cat && cat.trim() !== '');
    return [...new Set(cats)];
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!selectedCategory) return threads;
    return threads.filter((thread) => thread.category === selectedCategory);
  }, [threads, selectedCategory]);

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h2>Diskusi Tersedia</h2>
      </header>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ThreadsList threads={filteredThreads} users={users} />
    </div>
  );
}

export default HomePage;
