import SimpleImageSlider from "react-simple-image-slider";

function ImagesGallery({gallery}) {
  return (
    <div>
    <SimpleImageSlider
      width={896}
      height={504}
      images={gallery}
      showBullets={true}
      showNavs={true}
    />
  </div>
  )
}

export default ImagesGallery