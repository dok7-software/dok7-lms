import { useState, useMemo, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CourseCard, Course } from '@/features/courses/components/course-card'
import { mockCourses } from '@/features/courses/data/mock-courses'
import CreateCourseForm from './components/course-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { useParams, useNavigate } from '@tanstack/react-router'

const estados = ['abierto', 'en progreso', 'cerrado']
const categorias = Array.from(
  new Set(mockCourses.map((c) => c.category).filter(Boolean))
)

export default function CourseList() {
  const [search, setSearch] = useState('')
  const [estado, setEstado] = useState('')
  const [categoria, setCategoria] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const [courses, setCourses] = useState(mockCourses)
  const [open, setOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [deleteCourse, setDeleteCourse] = useState<Course | null>(null)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  // Formulario
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    participants: '',
    modules: '',
    startDate: '',
    endDate: '',
    status: '',
    category: '',
    instructor: '',
  })

  const navigate = useNavigate()

  // Filtrado y búsqueda
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = [
        course.title,
        course.instructor,
        course.description,
      ]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(search.toLowerCase()))
      const matchesEstado = estado ? course.status === estado : true
      const matchesCategoria = categoria ? course.category === categoria : true
      return matchesSearch && matchesEstado && matchesCategoria
    })
  }, [search, estado, categoria, courses])

  // Paginación
  const total = filteredCourses.length
  const totalPages = Math.ceil(total / perPage) || 1
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * perPage,
    page * perPage
  )

  // Resetear página al cambiar filtros
  useEffect(() => {
    setPage(1)
  }, [search, estado, categoria, perPage])

  console.log({
    total,
    perPage,
    totalPages,
    page,
    paginatedCoursesLength: paginatedCourses.length,
  })

  const handleViewDetail = (course: Course) => {
    navigate({ to: `/courses/${course.id}` })
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setOpen(true)
  }

  const handleSubmit = (data: any) => {
    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...editingCourse, ...data } : c))
      )
    } else {
      setCourses((prev) => [
        {
          id: Date.now().toString(),
          image: data.image,
          title: data.title,
          description: data.description,
          participants: Number(data.participants),
          modules: Number(data.modules),
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status as any,
          category: data.category,
          instructor: data.instructor,
        },
        ...prev,
      ])
    }
    setOpen(false)
    setEditingCourse(null)
  }

  const handleDelete = (course: Course) => {
    setDeleteCourse(course)
    setDeleteDialogOpen(true)
  }

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
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Cursos disponibles
          </h1>
          <p className='text-muted-foreground'>
            Explora nuestra oferta de cursos y encuentra el que mejor se adapte
            a tus necesidades.
          </p>
        </div>
        <div className="my-4 flex flex-col gap-4 sm:my-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Izquierda: Botón Crear curso */}
          <div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant='default' className='h-9'>
                  Crear curso
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <SheetHeader>
                  <SheetTitle>Crear nuevo curso</SheetTitle>
                  <SheetDescription>
                    Completa los datos para crear un nuevo curso.
                  </SheetDescription>
                </SheetHeader>
                <CreateCourseForm
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setOpen(false)
                    setEditingCourse(null)
                  }}
                  initialValues={editingCourse ? {
                    title: editingCourse.title,
                    description: editingCourse.description,
                    image: editingCourse.image,
                    participants: String(editingCourse.participants),
                    modules: String(editingCourse.modules),
                    startDate: editingCourse.startDate,
                    endDate: editingCourse.endDate,
                    status: editingCourse.status,
                    category: editingCourse.category,
                    instructor: editingCourse.instructor,
                  } : undefined}
                />
              </SheetContent>
            </Sheet>
          </div>
          {/* Derecha: Filtros */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <Input
              placeholder='Buscar'
              className='h-9 w-40 lg:w-[250px]'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={estado || 'all'}
              onValueChange={(v) => setEstado(v === 'all' ? '' : v)}
            >
              <SelectTrigger className='w-50 h-9'>
                <SelectValue>{estado ? estado : 'Todos los estados'}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos los estados</SelectItem>
                {estados.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={categoria || 'all'}
              onValueChange={(v) => setCategoria(v === 'all' ? '' : v)}
            >
              <SelectTrigger className='w-50 h-9'>
                <SelectValue>
                  {categoria ? categoria : 'Todas las categorías'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todas las categorías</SelectItem>
                {categorias
                  .filter((c): c is string => !!c)
                  .map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              variant='outline'
              className='h-9'
              onClick={() => {
                setSearch('')
                setEstado('')
                setCategoria('')
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
        <Separator className='shadow-sm' />
        <ul className='no-scrollbar grid grid-cols-1 gap-4 overflow-auto pt-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {paginatedCourses.map((course: Course) => (
            <li key={course.id}>
              <CourseCard 
                course={course} 
                onViewDetail={handleViewDetail} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </li>
          ))}
        </ul>
        <div className='mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          {/* Texto a la izquierda */}
          <span className='text-muted-foreground text-xs'>
            Mostrando {paginatedCourses.length} de {total} cursos encontrados
          </span>
          {/* Paginador a la derecha */}
          <div className='flex items-center gap-2'>
            <span className='text-sm'>Cursos por página</span>
            <Select
              value={String(perPage)}
              onValueChange={(v) => setPerPage(Number(v))}
            >
              <SelectTrigger className='h-8 w-16'>
                <SelectValue>{perPage}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[4, 8, 12, 16].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className='text-sm'>
              Página {page} de {totalPages}
            </span>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              {'<<'}
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              {'<'}
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              {'>'}
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              {'>>'}
            </Button>
          </div>
        </div>
      </Main>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el curso "{deleteCourse?.title}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                setCourses((prev) => prev.filter((c) => c.id !== deleteCourse?.id));
                setDeleteDialogOpen(false);
                setDeleteCourse(null);
              }}
            >
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
