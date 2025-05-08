export type ContentType = 'text' | 'video' | 'audio' | 'image' | 'pdf' | 'quiz' | 'assignment';

export interface CourseContent {
  id: string;
  title: string;
  type: ContentType;
  value: string;
  duration: number;
  required: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  contents: CourseContent[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  lessons: CourseLesson[];
}

export interface CourseParticipant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor';
  progress: number;
  lastAccess: string;
  enrolledAt: string;
}

export interface CourseSyllabus {
  objectives: string[];
  requirements: string[];
  targetAudience: string[];
  pdfUrl: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  duration: number;
  startDate: string;
  endDate: string;
  price: number;
  rating: number;
  totalStudents: number;
  certificate: boolean;
  forum: boolean;
  createdAt: string;
  updatedAt: string;
  syllabus: CourseSyllabus;
  modules: CourseModule[];
  participants: CourseParticipant[];
} 