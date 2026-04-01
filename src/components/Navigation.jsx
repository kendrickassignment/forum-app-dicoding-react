import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiLogOut, FiLogIn, FiPlusCircle } from 'react-icons/fi';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Navigation() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <nav className="navigation">
      <div className="navigation__inner">
        <Link to="/" className="navigation__logo">
          <h1>Forum Diskusi</h1>
        </Link>
        <div className="navigation__links">
          <Link to="/" className="navigation__link">Threads</Link>
          <Link to="/leaderboard" className="navigation__link">Leaderboard</Link>
        </div>
        <div className="navigation__auth">
          {authUser ? (
            <>
              <Link to="/new" className="navigation__link navigation__link--create" title="Buat Thread Baru">
                <FiPlusCircle size={20} />
                <span>Buat Thread</span>
              </Link>
              <div className="navigation__user">
                <img src={authUser.avatar} alt={authUser.name} className="navigation__avatar" />
                <span className="navigation__name">{authUser.name}</span>
              </div>
              <button type="button" className="navigation__logout" onClick={onLogout} title="Logout">
                <FiLogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="navigation__link navigation__link--login">
              <FiLogIn size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
