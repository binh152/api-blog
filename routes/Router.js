const router = require("express").Router();
const model = require("../model/Model");

router.get("/getALL", async (req, res) => {
  try {
    const getAll = await model.find(req);
    res.json(getAll);
  } catch (error) {
    res.json({ message: error })
  }
});

router.post("/add", async (req, res) => {
  const newBlg = new model({
    titleBlg: req.body.titleBlg,
    story: req.body.story,
    image: req.body.image
  });

  try {
    const saveBlg = await newBlg.save();
    res.json(saveBlg);
  } catch (error) {
    res.json({ message: error });
  }
});

//tim theo title
router.get("/:titleBlg", async (req, res) => {
  try {
    const getTitle = await model.findOne({ titleBlg: req.params.titleBlg });
    res.json(getTitle);
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
          image: req.body.image
        },
      }
    );
    res.json(updateBlg);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
