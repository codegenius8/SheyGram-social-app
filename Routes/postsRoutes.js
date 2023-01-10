const moment = require("moment");
const router = require("express").Router();
const { cloudinary } = require("../cloudinary");
const Post = require("../Models/postModel");
router.post("/addpost", async (req, res) => {
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "sheygram_udemy",
      use_filename: true,
    });
// upload 
    req.body.image = uploadResponse.url;
    const newPost = new Post(req.body);
    await newPost.save();

    res.status(200).send(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/editpost", async (req, res) => {
  console.log("edited data", req.body);
  try {
    await Post.updateOne({ _id: req.body.postId }, req.body);
    res.status(200).send("comment edited successfully");
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/deletepost", async (req, res) => {
  console.log("deleted data", req.body);
  try {
    await Post.findByIdAndDelete({ _id: req.body.postId });
    res.status(200).send("comment deleted successfully");
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/getAllPosts", async (req, res) => {
  const { userId } = req.body;
  // console.log(userId)
  try {
    const AllPosts = await Post.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .exec();
    //  console.log(AllPosts)
    res.status(200).send(AllPosts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/likeorunlike", async (req, res) => {
  // console.log(req.body.postId)
  console.log(req.body.userId);
  try {
    const posts = await Post.findOne({ _id: req.body.postId });
    var likes = posts.likes;
    // likes.find((obj) => console.log(obj.user.toString()) )
    if (likes.find((obj) => obj.user.toString() == req.body.userId)) {
      const unlikedPost = likes.filter(
        (obj) => obj.user.toString() !== req.body.userId
      );
      posts.likes = unlikedPost;
      await Post.updateOne({ _id: req.body.postId }, posts);
      res.send("post unliked successfully");
    } else {
      likes.push({
        user: req.body.userId,
        date: moment().format("MMM DD yyyy"),
      });
      //  console.log(likes)
      posts.likes = likes;
      await Post.updateOne({ _id: req.body.postId }, posts);

      res.status(200).send("post liked successfully");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/addcomment", async (req, res) => {
  // console.log(req.body.postId)
  // console.log(req.body.userId)
  try {
    const posts = await Post.findOne({ _id: req.body.postId });
    var comments = posts.comments;

    comments.push({
      user: req.body.userId,
      date: moment().format("MMM DD yyyy"),
      comments: req.body.comments,
    });

    posts.comments = comments;
    await Post.updateOne({ _id: req.body.postId }, posts);

    res.status(200).send("comment added successfully");
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
