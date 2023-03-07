import "./style.scss";

import PostPreview from "../PostPreview";

function PostsDisplay({posts}) {
  return (
    <>
      <div className="posts-display-comp">
        {posts.map((post) => (
          <PostPreview post={post} key={post._id} />
        ))}
      </div>
    </>
  );
}

export default PostsDisplay;
