import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";

function Header() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);
  return (
    <header className="games-header">
      <div className="container games-header-container">
        <h3 className="games-header-title">Welcome {name}!</h3>
        <button
          className="games-header-logout-btn"
          onClick={() => {
            dispatch(removeUser());
          }}
        >
          LOG OUT
        </button>
      </div>
    </header>
  );
}

export default Header;
