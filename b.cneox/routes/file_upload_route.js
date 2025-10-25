const express = require("express");
const router = express.Router();
const uploadService = require("../services/upload_service");

const multer = require("multer");
const path = require("path");
const e = require("express");

// const IMAGE_ENDPOINT = "http://162.220.24.4:5000/public/documents/";
const IMAGE_ENDPOINT = "https://crownbankers.com/home/public/documents/";
const TICKET_ENDPOINT = "https://crownbankers.com/home/public/tickets/";
const PROFILE_ENDPOINT =
  "https://crownbankers.com/home/public/profilepictures/";
const PROFILE_COVER_ENDPOINT =
  "https://crownbankers.com/home/public/profilepictures/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const docType = req.body.docType.toUpperCase();
      let destinationPath = "/home/public/documents"; // Default path

      switch (docType) {
        case "PASSPORT":
        case "NATIONAL_ID":
        case "DRIVING_LICENSE":
          destinationPath = `/home/public/documents`;
          break;
        case "TICKET_DOC":
          destinationPath = "/home/public/tickets";
          break;
        case "PROFILE":
          destinationPath = "/home/public/profilepictures";
          break;
        case "PROFILE_COVER":
          destinationPath = "/home/public/profilepictures";
          break;
      }

      cb(null, destinationPath);
    } catch (error) {
      console.error("Error in destination function:", error);
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    try {
      const { id } = req.params;
      const docType = req.body?.docType;

      const fileBasename = path.basename(
        file.originalname,
        path.extname(file.originalname)
      );
      const fileExtension = path.extname(file.originalname);

      var newFilename =
        id +
        "-" +
        docType +
        "-" +
        fileBasename +
        "-" +
        new Date().getTime() +
        fileExtension;

      cb(null, newFilename);
    } catch (error) {
      console.error("Error in filename function:", error);
      cb(error);
    }
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // for 50MB
});
// const upload = multer({ dest: "/home/public/documents" });

// Upload image
router.post("/:id", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      console.log(req);
      res
        .status(500)
        .json({ success: false, message: "Some issue with uploaded file." });
      // return next(err);
    } else {
      const { id } = req.params;

      console.log(req.body);
      const docType = req.body?.docType?.toUpperCase();

      let url;
      if (docType === "TICKET_DOC") {
        url = TICKET_ENDPOINT + req.file.filename;
      } else if (docType === "PROFILE") {
        url = PROFILE_ENDPOINT + req.file.filename;
      } else if (docType === "PROFILE_COVER") {
        url = PROFILE_COVER_ENDPOINT + req.file.filename;
      } else {
        url = IMAGE_ENDPOINT + req.file.filename;
      }
      console.log(url, "url");

      try {
        await uploadService.updateDocumentToDB({ id, docType, url });
        return res.json({
          success: true,
          message: "File uploaded successfully",
          data: {
            url: url,
            name: req.file.filename,
          },
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Error updating url to DB." });
      }
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Error updating url to DB." });
  }
});

module.exports = router;
