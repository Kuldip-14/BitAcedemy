import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import HeroSection from "./Pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./Pages/student/Courses";
import MyLearning from "./Pages/student/MyLearning";
import Profile from "./Pages/student/Profile";
import Dashboard from "./Pages/admin/Dashboard";
import CourseTable from "./Pages/admin/course/CourseTable";
import AddCourse from "./Pages/admin/course/AddCourse";
import Sidebar from "./Pages/admin/Sidebar";
import EditCourse from "./Pages/admin/course/EditCourse";
import CreateLecture from "./Pages/admin/lectures/CreateLecture";
import EditLecture from "./Pages/admin/lectures/EditLecture";
import CourseDetail from "./Pages/student/CourseDetail";
import CourseProgress from "./Pages/student/CourseProgress";
import SearchPage from "./Pages/student/searchPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "course/search",
        element: <SearchPage/>
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetail/>
      },
      {
        path: "course-progress/:courseId",
        element: <CourseProgress/>
      },

      // Admin Routes start here
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
