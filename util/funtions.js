function getVideoId(url) {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return false;
}

function findVideoFields(obj) {
  Object.keys(obj).forEach((key) => {
    if (key.includes("Video") && obj[key] !== null) {
      obj[key] = getVideoId(obj[key])
        ? "https://www.youtube.com/embed/" + getVideoId(obj[key])
        : null;
    }
    if (typeof obj[key] === "object" && obj[key] !== null) {
      findVideoFields(obj[key]);
    }
  });
}

// modify the standard yotube video URL so that it can be embeded
exports.modifyVideoUrl = (obj) => {
  findVideoFields(obj);
};
