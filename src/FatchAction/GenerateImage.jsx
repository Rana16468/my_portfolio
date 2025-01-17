const GenerateImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imgData = await res.json();
    return imgData?.data?.url;
  };
  
  export default GenerateImage;