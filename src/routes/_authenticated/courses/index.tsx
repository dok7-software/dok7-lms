import { createFileRoute } from '@tanstack/react-router';
import CourseList from '@/features/courses/index';

export const Route = createFileRoute('/_authenticated/courses/')({
  component: CourseList,
});

export default CourseList;

