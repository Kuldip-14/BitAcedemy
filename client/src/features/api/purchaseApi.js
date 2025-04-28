import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

<<<<<<< HEAD
const COURSE_PURCHASE_API =  "http://localhost:8080/api/v1/purchase";
=======
const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";
>>>>>>> parent of e32f611 (added render)

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    verifyPayment: builder.mutation({
      query: (paymentDetails) => ({
        url: "/checkout/verify-payment",
        method: "POST",
        body: paymentDetails,
      }),
    }),
    getCourseDetailsWithStatus: builder.query({
      query: (courseId) => ({
        url: `course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getAllPurchasedCourse: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useVerifyPaymentMutation, // ✅ Export it
  useGetCourseDetailsWithStatusQuery,
  useGetAllPurchasedCourseQuery,
} = purchaseApi;
