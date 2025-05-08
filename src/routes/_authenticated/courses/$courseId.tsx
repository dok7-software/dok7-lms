import { createFileRoute } from '@tanstack/react-router';

import CourseDetail from '@/features/courses/[course-id]';



export const Route = createFileRoute('/_authenticated/courses/$courseId')({
  component: CourseDetail
}); 