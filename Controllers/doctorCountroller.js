import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Successfuly update", data: updateDoctor });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update", data: updateDoctor });
  }
};
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updateDoctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfuly deleted",
      data: updateDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete", data: updateDoctor });
  }
};
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id).select("-password");
    res
      .status(200)
      .json({ success: true, message: "Doctor found", data: updateDoctor });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Not User found", data: updateUser });
  }
};
export const getAllDoctor = async (req, res) => {
  try {
    const {query} = req.query;
    let doctors;
    if (query){
        doctors = await Doctor.find({
            isApproved: "approved",
            $or: [
                {name:{$regex: query, $options: "i"} },
                {specialization:{$regex: query, $options: "i"} }
            ],
        }).select("-password");
        } else {
            doctors = await Doctor.find({isApproved: "approved" }).select("-password")
           
        }
    
    res.status(200).json({ success: true, message: "Doctor found", data: doctors });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
