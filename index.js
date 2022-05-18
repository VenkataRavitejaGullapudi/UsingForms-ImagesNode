const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const app = express();

cloudinary.config({
  cloud_name: "dg8b44ymx",
  api_key: "116112787115389",
  api_secret: "KV46HfHNzHIOi7aU9KcAg1nVW10",
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

app.set("view engine", "ejs");

app.get("/myget", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
app.post("/mypost", async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  
  // # Single Image upload
  // const result =  await cloudinary.uploader.upload(req.files.file.tempFilePath,{
  //     folder:"users"
  // })
  const imageArray = [];
  if (req.files) {
    for (let i = 0; i < req.files.file.length; i++) {
        console.log("Uploading"+i+1);
      const result = await cloudinary.uploader.upload(req.files.file[i].tempFilePath, {
        folder: "users/multiple",
      });
      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  res.send({
    ...req.body,
    upload: imageArray,
  });
});
app.get("/mygetform", (req, res) => {
  res.render("getform");
});
app.get("/mypostform", (req, res) => {
  res.render("postform");
});
app.listen(4000, () => console.log("Server is listening at port 4000"));
