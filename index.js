const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/user-profile");
const imageRoutes = require("./routes/image.js");
const companyRoutes = require("./routes/company");
const jobRoutes = require("./routes/jobs");
const errorController = require("./controllers/error");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//app.use(forms.array());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", imageRoutes);
app.use("/api", jobRoutes);
app.use("/api", companyRoutes);
app.use(errorController.get404);

const PORT = process.env.PORT || 8082;
app.listen(PORT, (_) => {
  console.log(`App deployed at Port ${PORT}`);
});
