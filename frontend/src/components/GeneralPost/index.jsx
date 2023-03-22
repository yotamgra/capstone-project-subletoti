import "./style.scss";
import ImgesGallery from "../ImagesGallery";
import CheckIn from "../CheckIn";

function GeneralPost({ singlePost }) {
  return (
    <div className="general-post-comp">
      <>
        <header>
          <h1>{singlePost.header}</h1>
        </header>
        <ImgesGallery gallery={singlePost.imagesGallery} />
        <CheckIn post={singlePost} />
      </>
    </div>
  );
}

export default GeneralPost;
