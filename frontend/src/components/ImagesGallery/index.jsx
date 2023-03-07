import "./style.scss";
import { useState, useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";

function ImagesGallery({ gallery }) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderHeight, setSliderHeight] = useState(0);
  const doWidthCalc = () => {
    if (window.innerWidth < 750) {
      setSliderWidth(window.innerWidth - 30);
      setSliderHeight((window.innerWidth - 30) * 0.7);
    } else if (window.innerWidth < 750) {
    } else if (window.innerWidth > 750) {
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

  return (
    <div className="images-gallery-comp">
      <SimpleImageSlider
        width={sliderWidth}
        height={sliderHeight}
        images={gallery}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}

export default ImagesGallery;
