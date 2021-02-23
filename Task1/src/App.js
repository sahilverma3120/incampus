import React, { useState, useEffect } from "react";
import "./style.css";
// Material UI
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
export default function App() {
  const max = 1000;

  // Use State for Images.
  const [images, setImages] = useState([]);
  const [limit, setLimit] = useState(10);
  // API
  const api = "https://jsonplaceholder.typicode.com/photos";
  // On Mount Call API & Filter Data
  useEffect(() => {
    fetchImages();
    console.log(limit);
  }, [limit]);

  // Fetch Data
  const fetchImages = () => {
    // Call the API
    fetch(api)
      .then(res => res.json())
      .then(data => {
        // Filter to Even albumId only
        const filterData = data.filter(x => x.albumId % 2 === 0);
        setImages(filterData);
      })
      .catch(err => console.log(err));
  };

  const handleShowMoreImages = () => {
    // I'm getting an error her
    if (limit <= max) {
      setLimit(limit + 10);
    }
  };

  return (
    <div>
      {images.slice(0, limit).map(album => (
        <img className="albumImg" src={album.url} alt={album.title} />
      ))}
      <button
        disabled={limit >= max}
        onClick={handleShowMoreImages}
        variant="contained"
      >
        Load More
      </button>
    </div>
  );
}
