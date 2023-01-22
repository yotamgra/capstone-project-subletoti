import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostsDisplay from "../components/PostsDisplay";
import NewPostForm from "../components/NewPostForm";

function Dashboard() {

  const [isFormExpended,setIsFormExpended ] = useState(false)

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
   

  }, [user, navigate]);

  return <div>
    <h1>Welcome {user && user.name}</h1>
    {isFormExpended?(<NewPostForm setIsFormExpended={setIsFormExpended} />):( <button onClick={()=>setIsFormExpended(true)}>Add new Post</button>)}
   
    {user && <PostsDisplay />}
   
  </div> ;
}

export default Dashboard;
