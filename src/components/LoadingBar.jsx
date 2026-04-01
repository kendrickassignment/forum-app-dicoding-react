import { useSelector } from 'react-redux';

function LoadingBar() {
  const loading = useSelector((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="loading-bar" role="progressbar" aria-label="Loading">
      <div className="loading-bar__progress" />
    </div>
  );
}

export default LoadingBar;
