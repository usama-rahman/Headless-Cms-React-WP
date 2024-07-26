import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Blog({ post }) {
  const [featuredImage, setFeaturedimage] = useState();

  const getImage = () => {
    const mediaLink = post?._links?.["wp:featuredmedia"]?.[0]?.href;
    if (mediaLink) {
      axios
        .get(mediaLink)
        .then((response) => {
          setFeaturedimage(response.data.source_url);
        })
        .catch((error) => {
          console.error("Error fetching featured image:", error);
        });
    }
  };

  useEffect(() => {
    getImage();
  }, [post]);

  return (
    <div className="container">
      <div className="blog-container">
        <p className="blog-date">
          {new Date(Date.now()).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="blog-title">{post.title.rendered}</h2>
        <p
          className="blog-excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <img src={featuredImage} className="mask" />
      </div>
    </div>
  );
}
