function getVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function findVideoFields(obj){
  Object.keys(obj).forEach((key) => {
    if (key.includes("Video") && obj[key] !== null) {
      obj[key] = "https://www.youtube.com/embed/" + getVideoId(obj[key]);
    }
    if (typeof obj[key] === "object" && obj[key] !== null) {
      findVideoFields(obj[key]);
    }
  });
};

// modify the standard yotube video URL so that it can be embeded
exports.modifyVideoUrl = (obj) => {
    findVideoFields(obj);
}
