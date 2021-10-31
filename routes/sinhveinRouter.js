const router = require("express").Router();
const model = require("../model/sinhvienModel");

router.get("/sinhvien", async (req, res) => {
  try {
    const getSV = await model.find();
    res.json(getSV);
  } catch (error) {}
});

router.post("/sinhvien", async (req, res) => {
  const newSV = new model({
    hoten: req.body.hoten,
    ngaysinh: req.body.ngaysinh,
    diemTB_ky1: req.body.diemTB_ky1,
  });

  try {
    const saveSV = await newSV.save();
    res.json(saveSV);
  } catch (error) {
    res.json({ message: error });
  }
});

//get one
router.get("/:id", async (req, res) => {
  try {
    const getOne = await model.findById(req.params.id);
    res.json(getOne);
  } catch (error) {
    res.json({ message: error });
  }
});
//delete
router.delete("/:id", async (req, res) => {
  try {
    const removeSV = await model.remove({ _id: req.params.id });
    res.json(removeSV);
  } catch (error) {
    res.json({ message: error });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updateSV = await model.updateMany(
      { _id: req.params.id },
      {
        $set: {
          hoten: req.body.hoten,
          ngaysinh: req.body.ngaysinh,
          diemTB_ky1: req.body.diemTB_ky1
        },
      }
    );
    res.json(updateSV);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
