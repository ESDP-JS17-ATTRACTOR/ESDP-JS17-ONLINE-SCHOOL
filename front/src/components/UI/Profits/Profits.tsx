import React from 'react';
import CoursePreviewCard from '@/components/Cards/CoursePreviewCard';
import { useAppSelector } from '@/app/hooks';
import { selectCourses } from '@/features/courses/coursesSlice';

const Profits = () => {
  const courses = useAppSelector(selectCourses);
  console.log(courses);
  return (
    <div className="profits">
      <div className="profits-container">
        <h3 className="profits-container-calculate">Calculate profits</h3>
        <div className="profits-container-cards">
          <CoursePreviewCard />
          <CoursePreviewCard />
          <CoursePreviewCard />
          <CoursePreviewCard />
        </div>
        <button className="profits-container-btn">10 courses from 23</button>
      </div>
    </div>
  );
};

export default Profits;
