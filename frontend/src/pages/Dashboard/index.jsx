import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features/posts/postSlice";
import PostsDisplay from "../../components/PostsDisplay";
import { toast } from "react-toastify";
import { Spin } from "antd";
import DrawerForm from "../../components/DrawerForm";
import MobilePostForm from "../../components/MobilePostForm";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const shouldDispatch = useRef(true);

  const [drawerWidth, setDrawerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [calanderDirection, setCalanderDirection] = useState("horizontal");

  const doWidthCalc = () => {
    if (window.innerWidth < 450) {
      setIsMobile(true);
      setIsDesktop(false);
    } else if (window.innerWidth < 750) {
      setDrawerWidth(window.innerWidth);
      setCalanderDirection("vertical");
      setIsDesktop(true);
      setIsMobile(false);
    } else if (window.innerWidth > 750) {
      setDrawerWidth(750);
      setCalanderDirection("horizontal");
      setIsDesktop(true);
      setIsMobile(false);
    }
  };
  useEffect(() => {
    doWidthCalc();

    window.addEventListener("resize", doWidthCalc);

    // cleanup effect.
    return () => {
      window.removeEventListener("resize", doWidthCalc);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (shouldDispatch.current && user) {
      shouldDispatch.current = false;
      dispatch(getAllPosts());
    }
  }, [dispatch, isError, message, user]);

  if (isLoading) {
    return (
      <div className="dashboard-loading-comp">
        <Spin className="spinner" tip="Loading" size="large" />
      </div>
    );
  }
  return (
    <div className="dashboard-comp">
      <h1>Welcome {user && user.name}</h1>

      {/* <NewPostForm /> */}
      {isDesktop && (
        <DrawerForm
          drawerWidth={drawerWidth}
          calanderDirection={calanderDirection}
        />
      )}
      {isMobile && <MobilePostForm />}

      {user && <PostsDisplay posts={posts} />}
    </div>
  );
}

export default Dashboard;
