import { Course } from '../types/course';

export const mockDetailedCourse: Course = {
  id: '1',
  title: 'Desarrollo Web Full Stack con React y Node.js',
  description: 'Aprende a crear aplicaciones web completas desde cero utilizando las tecnologías más demandadas del mercado.',
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
  instructor: 'Juan Pérez',
  category: 'Desarrollo Web',
  status: 'published',
  level: 'intermediate',
  language: 'Español',
  duration: 40,
  startDate: '2024-03-01',
  endDate: '2024-06-30',
  price: 199.99,
  rating: 4.8,
  totalStudents: 150,
  certificate: true,
  forum: true,
  createdAt: '2024-02-01',
  updatedAt: '2024-02-15',
  syllabus: {
    objectives: [
      'Dominar los fundamentos de React y Node.js',
      'Crear aplicaciones web full stack completas',
      'Implementar autenticación y autorización',
      'Desplegar aplicaciones en producción'
    ],
    requirements: [
      'Conocimientos básicos de HTML, CSS y JavaScript',
      'Computadora con al menos 8GB de RAM',
      'Conexión a internet estable'
    ],
    targetAudience: [
      'Desarrolladores web principiantes',
      'Estudiantes de programación',
      'Profesionales que buscan actualizar sus habilidades'
    ],
    pdfUrl: '/syllabus/desarrollo-web-fullstack.pdf'
  },
  modules: [
    {
      id: 'm1',
      title: 'Fundamentos de React',
      description: 'Aprende los conceptos básicos de React y su ecosistema',
      duration: 10,
      lessons: [
        {
          id: 'l1',
          title: 'Introducción a React',
          description: 'Conceptos básicos y configuración del entorno',
          duration: 60,
          contents: [
            {
              id: 'c1',
              title: '¿Qué es React?',
              type: 'text',
              value: 'React es una biblioteca JavaScript para construir interfaces de usuario...',
              duration: 15,
              required: true
            },
            {
              id: 'c2',
              title: 'Configuración del entorno',
              type: 'video',
              value: 'https://www.youtube.com/embed/example1',
              duration: 20,
              required: true
            },
            {
              id: 'c3',
              title: 'Quiz: Conceptos básicos',
              type: 'quiz',
              value: 'quiz1',
              duration: 10,
              required: true
            }
          ]
        }
      ]
    },
    {
      id: 'm2',
      title: 'Backend con Node.js',
      description: 'Desarrollo de APIs RESTful con Node.js y Express',
      duration: 15,
      lessons: [
        {
          id: 'l2',
          title: 'Introducción a Node.js',
          description: 'Configuración y primeros pasos con Node.js',
          duration: 90,
          contents: [
            {
              id: 'c4',
              title: 'Instalación y configuración',
              type: 'text',
              value: 'Guía paso a paso para instalar Node.js...',
              duration: 20,
              required: true
            },
            {
              id: 'c5',
              title: 'Creando tu primer servidor',
              type: 'video',
              value: 'https://www.youtube.com/embed/example2',
              duration: 30,
              required: true
            }
          ]
        }
      ]
    }
  ],
  participants: [
    {
      id: 'p1',
      name: 'María García',
      email: 'maria@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'student',
      progress: 75,
      lastAccess: '2024-02-20',
      enrolledAt: '2024-02-01'
    },
    {
      id: 'p2',
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'student',
      progress: 45,
      lastAccess: '2024-02-19',
      enrolledAt: '2024-02-05'
    },
    {
      id: 'p3',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'instructor',
      progress: 100,
      lastAccess: '2024-02-20',
      enrolledAt: '2024-01-15'
    }
  ]
}; 