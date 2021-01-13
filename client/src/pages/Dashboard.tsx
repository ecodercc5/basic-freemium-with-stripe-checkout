import { useHistory } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Dashboard = () => {
  const { auth } = useAuth();
  // const history = useHistory();

  const handleClick = () => {
    return auth.signOut();
  };

  return (
    <div>
      dashboard
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
