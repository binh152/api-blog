const router = require("express").Router();
const model = require("../model/Model");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/getALL", async (req, res) => {
  try {
    const getAll = await model.find(req);
    res.json(getAll);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/add", upload.single('photo'),async (req, res) => {
  console.log(req.file);
  const newBlg = new model({
    titleBlg:req.body.titleBlg,
    story:req.body.story,
    photo:req.file.path
  });

  try {
    const saveBlg = await newBlg.save();
    res.json(saveBlg);
  } catch (error) {
    res.json({ message: error });
  }
});

//tim theo id
router.get("/:id", async (req, res) => {
  try {
    const getId = await model.findOne({ _id: req.params.id });
    res.json(getId);
  } catch (error) {
    res.json({ message: error });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const removeBlg = await model.remove({ _id: req.params.id });
    res.json(removeBlg);
  } catch (error) {
    res.json({ message: error });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updateBlg = await model.updateMany(
      { _id: req.params.id },
      {
        $set: {
          titleBlg: req.body.titleBlg,
          story: req.body.story,
          image: req.body.image,
        },
      }
    );
    res.json(updateBlg);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
