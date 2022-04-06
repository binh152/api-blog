const router = require("express").Router();
const model = require("../model/Model");

router.get("/", async (req, res) => {
  try {
    const getQA = await model.find();
    res.json(getQA);
  } catch (error) {}
});

router.post("/", async (req, res) => {
  const newQA = new model({
    titleBlg: req.body.titleBlg,
    story: req.body.story,
    image: req.body.image
  });

  try {
    const saveQA = await newQA.save();
    res.json(saveQA);
  } catch (error) {
    res.json({ message: error });
  }
});

//tim theo ten
router.get("/:titleBlg", async (req, res) => {
  try {
    const getName = await model.findOne({ titleBlg: req.params.titleBlg });
    res.json(getName);
  } catch (error) {
    res.json({ message: error });
  }
});


//delete
router.delete("/:id", async (req, res) => {
  try {
    const removeQA = await model.remove({ _id: req.params.id });
    res.json(removeQA);
  } catch (error) {
    res.json({ message: error });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updateQA = await model.updateMany(
      { _id: req.params.id },
      {
        $set: {
          titleBlg: req.body.titleBlg,
          story: req.body.story,
          image: req.body.image
        },
      }
    );
    res.json(updateQA);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
