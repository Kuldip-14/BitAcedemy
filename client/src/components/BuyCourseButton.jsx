import React from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { isLoading }] = useCreateCheckoutSessionMutation();
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const purchaseCourseHandler = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay SDK");
      return;
    }

    try {
      const res = await createCheckoutSession(courseId).unwrap();

      const options = {
        key: res.key,
        amount: res.amount,
        currency: res.currency,
        name: res.courseName,
        description: "Purchase this course",
        image: res.courseThumbnail,
        order_id: res.orderId,
        handler: async function (response) {
          try {


            const verifyRes = await fetch("http://localhost:8080/api/v1/purchase/checkout/verify", {

              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: courseId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment successful & verified!");

              // ✅ Redirect to course progress page
              navigate(`/course-progress/${courseId}`);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            toast.error("Server error during verification");
            console.error(err);
          }
        },
        prefill: {
          name: res.user?.name || "",
          email: res.user?.email || "",
          contact: res.user?.contact || "",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create checkout session");
    }
  };

  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
