const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("images", 4), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Aucune image reçue." });
    }

    const fileNames = req.files.map(file => file.filename);

    res.status(200).json({
        message: "Images uploadées avec succès !",
        fileNames: fileNames
    });
});

app.use("/images", express.static("images"));

app.listen(3001, () => {
    console.log("Mini API d'upload démarrée sur http://localhost:3001");
});
