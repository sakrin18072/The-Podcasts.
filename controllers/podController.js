import episodeModel from "../models/episodeModel.js";
import podcastModel from "../models/podcastModel.js";
import userModel from "../models/userModel.js";
export const createPodcastController = async (req, res) => {
  try {
    const { name, desc, category, type, speaker, thumbnail,thumbName,fileName,isAdmin } = req.body;
    if (!name) return res.send({ success: false, message: "Name is required" });
    if (!desc)
      return res.send({ success: false, message: "Description is required" });
    if (!category)
      return res.send({ success: false, message: "Category is required" });
    if (!type) return res.send({ success: false, message: "Type is required" });
    if (!speaker)
      return res.send({ success: false, message: "Speaker is required" });
    if (!thumbnail)
      return res.send({ success: false, message: "Thumbnail is required" });
    const uploadedBy = req.user._id;
    console.log(uploadedBy);
    const podcast =await new podcastModel({
      name,
      desc,
      category,
      type,
      speaker,
      isAdmin,
      thumbnail,
      uploadedBy,
      thumbName,
      fileName
    }).save();
    res.status(201).send({
      success: true,
      message: "Podcast created successfully",
      podcast,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in creating podcast", error });
    console.log(error);
  }
};

export const getAllPodcastsController = async (req, res) => {
  try {
    const podcasts = await podcastModel.find().sort({views:-1})
    res.status(200).send({
      success: true,
      message: "All podcasts fetched",
      podcasts,
    });
  } catch (error) {
    res
      .status(400)
      .send({
        success: false,
        message: "Error in fetching all podcasts",
        error,
      });
    console.log(error);
  }
};
export const getPodcastsByIDController = async (req, res) => {
  try {
    const podcasts = await podcastModel.find({uploadedBy:req.user._id});
    res.status(200).send({
      success: true,
      message: "Podcasts Fetched",
      podcasts,
    });
  } catch (error) {
    res
      .status(400)
      .send({
        success: false,
        message: "Error in fetching podcasts by id",
        error,
      });
    console.log(error.message);
  }
};

export const updatePodcastController = async (req, res) => {
  try {
    const { name, desc, category, type, speaker, thumbnail, file,fileName,thumbName, pid } =
      req.body;
    if (!name) return res.send({ success: false, message: "Name is required" });
    if (!desc)
      return res.send({ success: false, message: "Description is required" });
    if (!category)
      return res.send({ success: false, message: "Category is required" });
    if (!type) return res.send({ success: false, message: "Type is required" });
    if (!speaker)
      return res.send({ success: false, message: "Speaker is required" });
    if (!thumbnail)
      return res.send({ success: false, message: "Thumbnail is required" });
    
    const uploadedBy = req._id;
    const podcast = await podcastModel.findByIdAndUpdate(
      pid,
      { name, desc, category, type, speaker, thumbnail, uploadedBy,thumbName},
      { new: true }
    );
    await podcast.save();
    res.status(201).send({
      success: true,
      message: "Podcast updated successfully",
      podcast,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in updating podcast", error });
    console.log(error);
  }
};



export const getPodcastController = async (req, res) => {
  try {
    const { pid } = req.params;
    const podcast = await podcastModel.findOne({ _id: pid }).populate('episodes');
    await podcastModel.updateOne({_id:pid},{$inc:{views:1}},{new:true});
    return res.status(200).send({
      success: true,
      message: "Podcast fetched successfully",
      podcast,
    });
  } catch (error) {
    res
      .status(400)
      .send({
        success: false,
        message: "Error in fetching single podcast",
        error,
      });
    console.log(error);
  }
};

export const deletePodcastController = async (req, res) => {
  try {
    const {pid} = req.params;

    await podcastModel.findByIdAndDelete({_id:pid});
    return res.status(200).send({
      success: true,
      message: "Podcast deleted successfully",
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in deleting podcast", error });
    console.log(error);
  }
res.send({success:true});
};

export const createEpisodeController = async (req,res)=>{
    try {
        const {name,pod,desc,episode} = req.body;
        const ep =await new episodeModel({name,desc,episode}).save();
        const podcast =await podcastModel.findByIdAndUpdate(pod,{$push:{episodes:ep}});
        res.status(200).send({
            success:true,
            message:"Episode created successfully",
            podcast
        })
    } catch (error) {
        res
      .status(400)
      .send({ success: false, message: "Error in creating episode", error });
    console.log(error);
    }
}

export const updateEpisodeController = async (req,res)=>{
  try {
    const {id,name,desc} = req.body;
    await episodeModel.findByIdAndUpdate(id,{name,desc});
    res.status(200).send({
      success:true,
      message:"Episode updated successfully"
    })
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in updating episode", error });
    console.log(error);
  }
}
export const fetchEpisodeController = async (req,res)=>{
  try {
    const {epID} = req.body;
    const ep = await episodeModel.findOne({_id:epID});
    return res.status(200).send({
      success:true,
      message:"Episode fetched successfully",
      ep
    })
    
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in fetching episode", error });
    console.log(error);
  }
}

export const deleteEpisodeController = async (req, res) => {
  try {
    const {pid,id} = req.params;
    await podcastModel.updateOne({_id:pid},{$pullAll:{episodes:[{_id:id}]}})
    await episodeModel.findByIdAndDelete({_id:id});
    return res.status(200).send({
      success: true,
      message: "Episode deleted successfully",
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in deleting podcast", error });
    console.log(error);
  }
};

export const getFavouritesController  = async(req,res)=>{
  try {
    const favs = await userModel.findById(req.user._id).populate('favourites');
    return res.status(200).send({
      success:true,
      message:"Likes fetched successfully",
      favs
    })
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in fetching favourites", error });
    console.log(error);
  }
}

export const addToFavouritesController  = async(req,res)=>{
  try {
    const {id} = req.body;
    const pod = await podcastModel.findById(id);
    const favs = await userModel.updateOne({_id:req.user._id},{$push:{favourites:pod}});
    return res.status(200).send({
      success:true,
      message:"Like added successfully",
      favs
    })
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in fetching favourites", error });
    console.log(error);
  }
}
export const removeFromFavouritesController  = async(req,res)=>{
  try {
    const {id} = req.body;
    const favs = await userModel.updateOne({_id:req.user._id},{$pullAll:{favourites:[{_id:id}]}});
    return res.status(200).send({
      success:true,
      message:"Like removed successfully",
      favs
    })
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in removing from favourites", error });
    console.log(error);
  }
}


