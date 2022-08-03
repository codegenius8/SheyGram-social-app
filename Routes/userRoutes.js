const router = require("express").Router();
const User = require("../Models/userModel");
const { cloudinary } = require("../cloudinary");
const jwt = require('jsonwebtoken')


router.post("/register", async (req, res, next) => {
  console.log("Register Api");
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(501).send("All inputs required");
  }
  try {
    const registeredUser = new User({
      username: username,
      password: password,
    });

    await registeredUser.save();
    return res.status(201).send(registeredUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.post("/login", async (req, res, next) => {
  console.log("login Api");
  const { username, password } = req.body;
  // try {
  //   const existingUser = await User.findOne({
  //     username: username,
  //     password: password,
  //   });
  //   if (!existingUser) {
  //     res.status(501).send("Invalid credentials");
  //   } else {
  //     res.status(201).send(existingUser);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return res.status(400).send(error);
  // }



  let user
  try {
     user = await User.findOne({ username, password });
    
  } catch (error) {
    res.status(500).send("Logging in failed, please try again later.");
 }

  let token;
  try {
    token = jwt.sign(
      { userId: user._id, user: user.username },
        "super_secret_dont_share",
      // { expiresIn: "60s" }
    );
  } catch (error) {
    console.log(error)
  }
  //  console.log("user",user)
  if (user === null) {
    res.status(401).send("Invalid credentials");
   
  } else {
    res.status(200).send({user : user, token : token})
  }
});

router.get("/getAllUsers", async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(201).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/followuser", async (req, res, next) => {
  const { currentUserId, receiverUserId } = req.body;
  //  console.log(currentUserId,receiverUserId)
  try {
    const currentUser = await User.findOne({ _id: currentUserId });
    var followingUsers = currentUser.following;
    followingUsers.push(receiverUserId);
    await User.updateOne({ _id: currentUserId }, currentUser);

    const receiverUser = await User.findOne({ _id: receiverUserId });
    var followerUsers = receiverUser.followers;
    followerUsers.push(currentUserId);
    await User.updateOne({ _id: receiverUserId }, receiverUser);

    res.status(201).send("Followed successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/unfollowuser", async (req, res, next) => {
  const { currentUserId, receiverUserId } = req.body;
  //  console.log(currentUserId,receiverUserId)
  try {
    const currentUser = await User.findOne({ _id: currentUserId });
    var followingUsers = currentUser.following;
    const temp1 = followingUsers.filter(
      (obj) => obj.toString() !== receiverUserId
    );
    currentUser.following = temp1;
    await User.updateOne({ _id: currentUserId }, currentUser);

    const receiverUser = await User.findOne({ _id: receiverUserId });
    var followerUsers = receiverUser.followers;
    const temp2 = followerUsers.filter(
      (obj) => obj.toString() !== currentUserId
    );
    receiverUser.followers = temp2;

    await User.updateOne({ _id: receiverUserId }, receiverUser);

    res.status(201).send("Followed successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/edit", async (req, res, next) => {
    
  try {
    const existingUser = await User.findOne({ _id: req.body._id });
  if (existingUser.profilepicUrl === req.body.profilepicUrl) {
    await User.updateOne({ _id: req.body._id }, req.body);
    const user = await User.findOne({_id : req.body._id})
    res.send(user);
  } else {
    const uploadResponse = await cloudinary.v2.uploader.upload(req.body.profilepicUrl, {
      folder: "sheygram_udemy",
      use_filename: true,
    });

    req.body.profilepicUrl = uploadResponse.url;
     await User.updateOne({ _id: req.body._id }, req.body);
    const user = await User.findOne({_id : req.body._id})
    res.send(user);
  }
  } catch (error) {
   console.log(error)
   res.status(400).json(error) 
  }
  
});

module.exports = router;
