import User from "../models/UserSchema.js";
import booking from "../models/BookingSchema.js";
import doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Successfuly update", data: updateUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update", data: updateUser });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfuly deleted",
      data: updateUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete", data: updateUser });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res
      .status(200)
      .json({ success: true, message: "User found", data: updateUser });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Not User found", data: updateUser });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ success: true, message: "User found", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getuserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    res
      .status(200)
      .json({ success: true, message: "User profile found", data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // stap -1 : retrive appoitments from booking
    const booking = await Booking.find({ user: req.userId });
    // stap -2 : extract doctoctor ids from appotment booking
    const doctrIds = bookings.map((e) => e.doctor.id);
    // stap -3 : retrive doctors using doctors ids
    const doctor = await Doctor.find({ _id: { $in: doctrIds } }).select(
      "-password"
    );

    res
      .status(200)
      .json({
        success: true,
        message: "profile info is getting",
        data: {...rest },
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};
