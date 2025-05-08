import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

export interface CourseContent {
  id: string;
  title: string;
  type: 'multimedia' | 'texto' | 'enlace' | 'evaluacion' | 'tarea';
  value: string;
}

export interface CourseModule {
  id: string;
  title: string;
  contents: CourseContent[];
}

export interface Course {
  id: string;
  image: string;
  title: string;
  description: string;
  participants: number;
  modules: number;
  startDate: string;
  endDate: string;
  status: 'abierto' | 'cerrado' | 'en progreso';
  category?: string;
  instructor?: string;
  courseModules?: CourseModule[];
}

interface CourseCardProps {
  course: Course;
  onViewDetail?: (course: Course) => void;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
}

const statusColors = {
  abierto: 'bg-green-100 text-green-800',
  'en progreso': 'bg-yellow-100 text-yellow-800',
  cerrado: 'bg-red-100 text-red-800',
};

export const CourseCard: React.FC<CourseCardProps> = ({ course, onViewDetail, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-md overflow-hidden flex flex-col border border-border hover:shadow-lg transition-shadow duration-200 h-full min-h-[370px]">
      <img src={course.image} alt={course.title} className="h-40 w-full object-cover" />
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center justify-between mb-2 min-h-[32px]">
          <h2 className="text-lg font-semibold text-foreground dark:text-card-foreground line-clamp-1">{course.title}</h2>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[course.status]}`}>{course.status}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewDetail && onViewDetail(course)}>
                  Ver detalle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit && onEdit(course)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete && onDelete(course)} variant="destructive">
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2 min-h-[40px]">{course.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2 min-h-[24px]">
          <span>👤 {course.participants} participantes</span>
          
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2 min-h-[24px]">
        <span>📦 {course.modules} módulos</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2 min-h-[24px]">
          <span>🗓️ Fechas : {course.startDate} al {course.endDate}</span>
          
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2 min-h-[24px]">
            {course.category && <span>🏷️ Categorias: {course.category}</span>}
        </div>
        <div className="flex-1 flex flex-col justify-end">
          {course.instructor && <div className="text-xs text-muted-foreground mb-2 min-h-[20px]">👨‍🏫 Instructor: {course.instructor}</div>}
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 