import { useLocation } from 'react-router-dom'

function PostPage() {
    const location = useLocation();
    console.log(location.pathname.split('/')[2]);
  return (
    <div>PostPage {location.pathname}</div>
  )
}

export default PostPage
