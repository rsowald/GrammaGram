const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
router.post('/', withAuth, async (req, res) => {

  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.passport.user,
    });

    res.status(200).json(newPost);
  } catch (err) {
    if (err.message = 'Validation isUrl on imageLink failed') {
      res.status(401).json(err)
    } else {
      res.status(400).json(err);
    }

  }
});

// router.delete('/:id', withAuth, async (req, res) => {
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.passport.user,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update a POST
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
