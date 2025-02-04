import Review from "../models/ReviewSchema";
import Doctor from "../models/DoctorSchema";

//get all reviews

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
//create reviews

export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.paeams.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const saveReview = await newReview.save();
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: saveReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review sumitted", data: saveReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};