import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourceLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourceLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "Lecture created successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-5 sm:mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Let's add a lecture</h1>
        <p className="text-sm">
          Add some basic details for your new lecture.
        </p>
      </div>
      <div className="space-y-4">
        {/* Title Input Section */}
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your lecture title"
            className="w-full sm:w-96"
          />
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
            className="w-full sm:w-auto"
          >
            Back to Course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        {/* Lectures List */}
        <div className="mt-10">
          {lectureLoading ? (
            <p className="text-center">Loading lectures...</p>
          ) : lectureError ? (
            <p>Failed to load lectures</p>
          ) : lectureData?.lectures.length === 0 ? (
            <p>No lectures available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
