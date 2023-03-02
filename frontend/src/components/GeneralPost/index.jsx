import "./style.scss";
import ImgesGallery from "../ImagesGallery";
import CheckIn from "../CheckIn";

function GeneralPost({ singlePost }) {
  return (
    <div className="general-post-comp">
      <>
        <h1>{singlePost.header}</h1>
        <ImgesGallery gallery={singlePost.imagesGallery} />
        <CheckIn post={singlePost} />
      </>
    </div>
  );
}

export default GeneralPost;
