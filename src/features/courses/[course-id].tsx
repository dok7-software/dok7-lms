import { useMemo } from 'react'
import { useParams } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import type {
  Course,
  CourseModule,
  CourseContent,
} from '@/features/courses/components/course-card'
import { mockCourses } from '@/features/courses/data/mock-courses'

export default function CourseDetail() {
  const { courseId } = useParams({ strict: false }) as { courseId: string }

  // Buscar el curso por id
  const course = useMemo(
    () => mockCourses.find((c: Course) => c.id === courseId),
    [courseId]
  )

  if (!course) return <div className='p-8'>Curso no encontrado</div>

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      {/* ===== Content ===== */}
      <Main>
        <div className='mx-auto max-w-4xl p-6'>
          <h1 className='mb-2 text-2xl font-bold'>{course.title}</h1>
          <p className='text-muted-foreground mb-4'>{course.description}</p>
          <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <img
                src={course.image}
                alt={course.title}
                className='mb-2 h-56 w-full rounded-lg object-cover'
              />
              <div className='text-muted-foreground mb-1 text-sm'>
                Instructor: {course.instructor}
              </div>
              <div className='text-muted-foreground mb-1 text-sm'>
                Participantes: {course.participants}
              </div>
              <div className='text-muted-foreground mb-1 text-sm'>
                Módulos: {course.modules}
              </div>
              <div className='text-muted-foreground mb-1 text-sm'>
                Fechas: {course.startDate} al {course.endDate}
              </div>
              <div className='text-muted-foreground mb-1 text-sm'>
                Estado: {course.status}
              </div>
              <div className='text-muted-foreground mb-1 text-sm'>
                Categoría: {course.category}
              </div>
            </div>
            <div>{/* Aquí puedes agregar más detalles o acciones */}</div>
          </div>
          <section className='mb-8'>
            <h2 className='mb-4 text-xl font-semibold'>
              Contenido por módulos
            </h2>
            {course.courseModules && course.courseModules.length > 0 ? (
              <div className='space-y-6'>
                {course.courseModules.map((mod: CourseModule) => (
                  <div key={mod.id} className='bg-card rounded-lg border p-4'>
                    <h3 className='mb-2 text-lg font-bold'>{mod.title}</h3>
                    <ul className='space-y-2'>
                      {mod.contents.map((content: CourseContent) => (
                        <li
                          key={content.id}
                          className='bg-muted/50 flex flex-col gap-1 rounded p-3'
                        >
                          <span className='font-medium'>{content.title}</span>
                          {content.type === 'texto' && (
                            <span className='text-muted-foreground text-sm'>
                              {content.value}
                            </span>
                          )}
                          {content.type === 'multimedia' && (
                            <div className='aspect-video w-full overflow-hidden rounded'>
                              <iframe
                                src={content.value}
                                title={content.title}
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                                className='h-full w-full border-none'
                              />
                            </div>
                          )}
                          {content.type === 'enlace' && (
                            <a
                              href={content.value}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-primary text-sm underline'
                            >
                              {content.value}
                            </a>
                          )}
                          {content.type === 'evaluacion' && (
                            <span className='text-sm text-yellow-700'>
                              {content.value}
                            </span>
                          )}
                          {content.type === 'tarea' && (
                            <span className='text-sm text-blue-700'>
                              {content.value}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className='bg-muted/50 rounded-lg border p-4'>
                <p className='text-muted-foreground'>
                  No hay módulos ni contenidos registrados para este curso.
                </p>
              </div>
            )}
          </section>
        </div>
      </Main>
    </>
  )
}
