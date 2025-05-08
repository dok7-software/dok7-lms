import { useState, useMemo, useEffect } from 'react'
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
import { TemplateCard, Template } from './components/template-card'
import { mockTemplates } from './data/mock-templates'
import CreateTemplateForm from '@/features/course-templates/components/template-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { useNavigate } from '@tanstack/react-router'

const categorias = Array.from(
  new Set(mockTemplates.map((t) => t.category).filter(Boolean))
)

export default function TemplateList() {
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const [templates, setTemplates] = useState(mockTemplates)
  const [open, setOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [deleteTemplate, setDeleteTemplate] = useState<Template | null>(null)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const navigate = useNavigate()

  // Filtrado y búsqueda
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch = [
        template.title,
        template.description,
      ]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(search.toLowerCase()))
      const matchesCategoria = categoria ? template.category === categoria : true
      return matchesSearch && matchesCategoria
    })
  }, [search, categoria, templates])

  // Paginación
  const total = filteredTemplates.length
  const totalPages = Math.ceil(total / perPage) || 1
  const paginatedTemplates = filteredTemplates.slice(
    (page - 1) * perPage,
    page * perPage
  )

  // Resetear página al cambiar filtros
  useEffect(() => {
    setPage(1)
  }, [search, categoria, perPage])

  const handleViewDetail = (template: Template) => {
    navigate({ to: `/course-templates/${template.id}` })
  }

  const handleEdit = (template: Template) => {
    setEditingTemplate(template)
    setOpen(true)
  }

  const handleSubmit = (data: any) => {
    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((t) => (t.id === editingTemplate.id ? { ...editingTemplate, ...data } : t))
      )
    } else {
      setTemplates((prev) => [
        {
          id: Date.now().toString(),
          image: data.image,
          title: data.title,
          description: data.description,
          modules: Number(data.modules),
          category: data.category,
          estimatedTime: data.estimatedTime,
        },
        ...prev,
      ])
    }
    setOpen(false)
    setEditingTemplate(null)
  }

  const handleDelete = (template: Template) => {
    setDeleteTemplate(template)
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
            Plantillas de cursos
          </h1>
          <p className='text-muted-foreground'>
            Explora nuestra colección de plantillas de cursos y encuentra la que mejor se adapte
            a tus necesidades.
          </p>
        </div>
        <div className="my-4 flex flex-col gap-4 sm:my-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Izquierda: Botón Crear plantilla */}
          <div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant='default' className='h-9'>
                  Crear plantilla
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <SheetHeader>
                  <SheetTitle>Crear nueva plantilla</SheetTitle>
                  <SheetDescription>
                    Completa los datos para crear una nueva plantilla de curso.
                  </SheetDescription>
                </SheetHeader>
                <CreateTemplateForm
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setOpen(false)
                    setEditingTemplate(null)
                  }}
                  initialValues={editingTemplate ? {
                    title: editingTemplate.title,
                    description: editingTemplate.description,
                    image: editingTemplate.image,
                    modules: String(editingTemplate.modules),
                    category: editingTemplate.category,
                    estimatedTime: editingTemplate.estimatedTime,
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
                setCategoria('')
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
        <Separator className='shadow-sm' />
        <ul className='no-scrollbar grid grid-cols-1 gap-4 overflow-auto pt-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {paginatedTemplates.map((template: Template) => (
            <li key={template.id}>
              <TemplateCard 
                template={template} 
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
            Mostrando {paginatedTemplates.length} de {total} plantillas encontradas
          </span>
          {/* Paginador a la derecha */}
          <div className='flex items-center gap-2'>
            <span className='text-sm'>Plantillas por página</span>
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
              ¿Estás seguro de que deseas eliminar la plantilla "{deleteTemplate?.title}"? Esta acción no se puede deshacer.
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
                setTemplates((prev) => prev.filter((t) => t.id !== deleteTemplate?.id));
                setDeleteDialogOpen(false);
                setDeleteTemplate(null);
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