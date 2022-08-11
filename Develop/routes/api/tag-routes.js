const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [
        {model: Product, as: "productTag", attributes: ["product_name"]}
      ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  
  }
  // be sure to include its associated Product data
 
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product, as: "productTag", attributes: ["product_name"]}
      ]
    });

    if (!tagData) {
      res.status(404).json({ message: 'no Tag found with that id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    console.log(tagData)
    res.status(200).json(tagData);
  } catch (err){
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData [0]){
      res.status(404).json({ messsage: 'no tag with this id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: ' No Tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
