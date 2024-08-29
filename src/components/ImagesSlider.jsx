import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

function ImagesSlider() {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <div className="App">
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        <a href="https://placholder.com/250x250">
          <img alt="img1" src="https://placholder.com/250x250" />
        </a>
        <a href="https://placholder.com/350x250">
          <img alt="img2" src="https://placholder.com/350x250" />
        </a>
      </LightGallery>
    </div>
  );
}

export default ImagesSlider;
