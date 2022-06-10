function getVideoId(url) {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
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

exports.base64ToBuffer = (data) => {
  let extension = data.slice(11, 14);
  if (extension !== "png") {
    extension = "jpeg";
  }
  let imgData = data.replace(/^data:image\/png;base64,/, "");
  imgData = imgData.replace(/^data:image\/jpeg;base64,/, "");
  const buffer = Buffer.from(imgData, "base64");
  return { buffer, extension };
};
