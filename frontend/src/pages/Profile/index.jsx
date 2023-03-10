import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function Profile() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>{user && user.name.split(" ")[0]}'s Profile</h1>

      <h3>My Posts</h3>

      
    </div>
  );
}

export default Profile;
