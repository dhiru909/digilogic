import React from 'react';
import { Course } from '../../types/index';
import { Book, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CoursesListProps {
  courses: Course[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  return (
    <div className="bg-primary-background border rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">My Courses</h2>
      <div className="space-y-4">
        {courses.length === 0 ? (
          <p className="text-gray-600">No courses enrolled yet.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
              <Link to={`/courses/${course.id}`} className="text-blue-600 hover:text-blue-700">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}