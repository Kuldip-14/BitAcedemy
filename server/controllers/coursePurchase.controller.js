import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../models/course.model.js"
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { User } from "../models/user.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const alreadyPurchased = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });
    if (alreadyPurchased) {
      return res
        .status(400)
        .json({ message: "You have already purchased this course." });
    }

    const order = await razorpay.orders.create({
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { userId, courseId },
    });

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      courseName: course.courseTitle,
      courseThumbnail: course.courseThumbnail,
      user: {
        name: req.user?.name,
        email: req.user?.email,
        contact: req.user?.contact,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;
    const userId = req.id;

    // 1️⃣ Validate Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // 2️⃣ Find Course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 3️⃣ Check if Already Purchased
    const alreadyPurchased = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });
    if (alreadyPurchased) {
      return res
        .status(200)
        .json({ success: true, message: "Already purchased" });
    }

    // 4️⃣ Save Purchase
    const purchase = await CoursePurchase.create({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "completed",
      paymentId: razorpay_payment_id,
    });

    // 5️⃣ Add User to Course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    ).populate("enrolledStudents", "name email");

    // 6️⃣ Add Course to User
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified and enrollment completed",
      enrolledStudents: updatedCourse.enrolledStudents,
    });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" })
      .populate({ path: "enrolledStudents", select: "name email" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      course,
      purchased: purchased ? true : false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
      userId: req.id,
    }).populate({ path: "courseId" });

    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

