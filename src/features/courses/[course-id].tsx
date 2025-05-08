import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { mockDetailedCourse } from './data/mock-course'
import type { CourseModule, CourseParticipant, ContentType } from './types/course'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { IconBook, IconUsers, IconFileText, IconClock, IconStar, IconDownload, IconPlus, IconVideo, IconPlayerPlay, IconFile, IconCheck } from '@tabler/icons-react'

export default function CourseDetail() {
  const course = mockDetailedCourse;
  const [activeTab, setActiveTab] = useState('content')
  const [isAddContentOpen, setIsAddContentOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<string>('')
  const [selectedLesson, setSelectedLesson] = useState<string>('')
  const [contentType, setContentType] = useState<ContentType>('text')
  const [contentTitle, setContentTitle] = useState('')
  const [contentDescription, setContentDescription] = useState('')
  const [contentDuration, setContentDuration] = useState('')
  const [contentValue, setContentValue] = useState('')
  const [isRequired, setIsRequired] = useState(true)

  const handleAddContent = () => {
    // Aquí iría la lógica para agregar el contenido
    console.log({
      moduleId: selectedModule,
      lessonId: selectedLesson,
      contentType,
      contentTitle,
      contentDescription,
      contentDuration: parseInt(contentDuration),
      contentValue,
      isRequired
    })
    
    // Limpiar el formulario
    setSelectedModule('')
    setSelectedLesson('')
    setContentType('text')
    setContentTitle('')
    setContentDescription('')
    setContentDuration('')
    setContentValue('')
    setIsRequired(true)
    
    // Cerrar el diálogo
    setIsAddContentOpen(false)
  }

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
        <div className='container mx-auto py-8'>
          {/* Course Header */}
          <div className='mb-8'>
            <div className='relative h-[300px] rounded-lg overflow-hidden'>
              <img
                src={course.image}
                alt={course.title}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                <div className='text-center text-white'>
                  <h1 className='text-4xl font-bold mb-4'>{course.title}</h1>
                  <div className='flex items-center justify-center gap-4'>
                    <Badge variant='secondary'>{course.category}</Badge>
                    <Badge variant='secondary'>{course.level}</Badge>
                    <Badge variant='secondary'>{course.language}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Course Info */}
            <div className='lg:col-span-2'>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='content'>
                    <IconFileText className='w-4 h-4 mr-2' />
                    Sobre el contenido
                  </TabsTrigger>
                  <TabsTrigger value='modules'>
                    <IconBook className='w-4 h-4 mr-2' />
                    Módulos
                  </TabsTrigger>
                  <TabsTrigger value='participants'>
                    <IconUsers className='w-4 h-4 mr-2' />
                    Participantes
                  </TabsTrigger>
                </TabsList>

                {/* Content Tab */}
                <TabsContent value='content'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Descripción del Curso</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-gray-600 mb-6'>{course.description}</p>
                      
                      <div className='space-y-6'>
                        <div>
                          <h3 className='text-lg font-semibold mb-2'>Objetivos del Curso</h3>
                          <ul className='list-disc list-inside space-y-1'>
                            {course.syllabus.objectives.map((objective: string, index: number) => (
                              <li key={index} className='text-gray-600'>{objective}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className='text-lg font-semibold mb-2'>Requisitos</h3>
                          <ul className='list-disc list-inside space-y-1'>
                            {course.syllabus.requirements.map((req: string, index: number) => (
                              <li key={index} className='text-gray-600'>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className='text-lg font-semibold mb-2'>Audiencia Objetivo</h3>
                          <ul className='list-disc list-inside space-y-1'>
                            {course.syllabus.targetAudience.map((audience: string, index: number) => (
                              <li key={index} className='text-gray-600'>{audience}</li>
                            ))}
                          </ul>
                        </div>

                        <Button className='w-full'>
                          <IconDownload className='w-4 h-4 mr-2' />
                          Descargar Syllabus
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Modules Tab */}
                <TabsContent value='modules'>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Módulos</CardTitle>
                      <Button onClick={() => setIsAddContentOpen(true)}>
                        <IconPlus className="w-4 h-4 mr-2" />
                        Agregar Contenido
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <Accordion type='single' collapsible className='w-full'>
                        {course.modules.map((module: CourseModule) => (
                          <ModuleAccordion key={module.id} module={module} />
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Add Content Dialog */}
                <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Contenido</DialogTitle>
                      <DialogDescription>
                        Complete los detalles del contenido que desea agregar al curso.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      {/* Selección de Módulo y Lección */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="module">Módulo</Label>
                          <Select value={selectedModule} onValueChange={setSelectedModule}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar módulo" />
                            </SelectTrigger>
                            <SelectContent>
                              {course.modules.map((module) => (
                                <SelectItem key={module.id} value={module.id}>
                                  {module.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lesson">Lección</Label>
                          <Select 
                            value={selectedLesson} 
                            onValueChange={setSelectedLesson}
                            disabled={!selectedModule}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar lección" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedModule && course.modules
                                .find(m => m.id === selectedModule)
                                ?.lessons.map((lesson) => (
                                  <SelectItem key={lesson.id} value={lesson.id}>
                                    {lesson.title}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Tipo de Contenido */}
                      <div className="space-y-2">
                        <Label htmlFor="contentType">Tipo de Contenido</Label>
                        <Select value={contentType} onValueChange={(value: ContentType) => setContentType(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Lectura</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="pdf">Archivo PDF</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Título y Descripción */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={contentTitle}
                          onChange={(e) => setContentTitle(e.target.value)}
                          placeholder="Ingrese el título del contenido"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          value={contentDescription}
                          onChange={(e) => setContentDescription(e.target.value)}
                          placeholder="Ingrese una descripción del contenido"
                        />
                      </div>

                      {/* Duración y Requerido */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duración (minutos)</Label>
                          <Input
                            id="duration"
                            type="number"
                            value={contentDuration}
                            onChange={(e) => setContentDuration(e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="required">¿Es requerido?</Label>
                          <Select value={isRequired.toString()} onValueChange={(value) => setIsRequired(value === 'true')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Sí</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Valor del Contenido */}
                      <div className="space-y-2">
                        <Label htmlFor="value">
                          {contentType === 'video' ? 'URL del Video' :
                           contentType === 'pdf' ? 'Archivo PDF' :
                           contentType === 'quiz' ? 'ID del Quiz' :
                           'Contenido de la Lectura'}
                        </Label>
                        {contentType === 'text' ? (
                          <Textarea
                            id="value"
                            value={contentValue}
                            onChange={(e) => setContentValue(e.target.value)}
                            placeholder="Ingrese el contenido de la lectura"
                            rows={5}
                          />
                        ) : (
                          <Input
                            id="value"
                            value={contentValue}
                            onChange={(e) => setContentValue(e.target.value)}
                            placeholder={
                              contentType === 'video' ? 'https://youtube.com/watch?v=...' :
                              contentType === 'pdf' ? 'Seleccionar archivo...' :
                              'ID del quiz en el sistema'
                            }
                            type={contentType === 'pdf' ? 'file' : 'text'}
                          />
                        )}
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddContentOpen(false)}>
                        Cancelar
                      </Button>
                      <Button 
                        onClick={handleAddContent}
                        disabled={!selectedModule || !selectedLesson || !contentTitle || !contentValue}
                      >
                        Agregar Contenido
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Participants Tab */}
                <TabsContent value='participants'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Participantes del Curso</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        {course.participants.map((participant: CourseParticipant) => (
                          <ParticipantCard key={participant.id} participant={participant} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Course Stats */}
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Información del Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Instructor</span>
                      <span className='font-medium'>{course.instructor}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Duración</span>
                      <span className='font-medium'>{course.duration} horas</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Nivel</span>
                      <Badge variant='secondary'>{course.level}</Badge>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Idioma</span>
                      <span className='font-medium'>{course.language}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Calificación</span>
                      <div className='flex items-center'>
                        <IconStar className='w-4 h-4 text-yellow-400 mr-1' />
                        <span className='font-medium'>{course.rating}</span>
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Estudiantes</span>
                      <span className='font-medium'>{course.totalStudents}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Certificado</span>
                      <Badge variant={course.certificate ? 'default' : 'secondary'}>
                        {course.certificate ? 'Disponible' : 'No disponible'}
                      </Badge>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Foro</span>
                      <Badge variant={course.forum ? 'default' : 'secondary'}>
                        {course.forum ? 'Disponible' : 'No disponible'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tu Progreso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Progreso General</span>
                      <span className='font-medium'>75%</span>
                    </div>
                    <Progress value={75} className='h-2' />
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Último acceso</span>
                      <span className='font-medium'>Hace 2 días</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}

function ModuleAccordion({ module }: { module: CourseModule }) {
  return (
    <AccordionItem value={module.id}>
      <AccordionTrigger className='hover:no-underline'>
        <div className='flex items-center justify-between w-full pr-4'>
          <div>
            <h3 className='text-lg font-semibold'>{module.title}</h3>
            <p className='text-sm text-gray-500'>{module.description}</p>
          </div>
          <div className='flex items-center gap-2'>
            <IconClock className='w-4 h-4 text-gray-500' />
            <span className='text-sm text-gray-500'>{module.duration} horas</span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='space-y-4 pl-4'>
          {module.lessons.map((lesson) => (
            <div key={lesson.id} className='border-l-2 border-gray-200 pl-4'>
              <h4 className='font-medium'>{lesson.title}</h4>
              <p className='text-sm text-gray-500 mb-2'>{lesson.description}</p>
              <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
                <IconClock className='w-4 h-4' />
                <span>{lesson.duration} minutos</span>
              </div>
              
              {/* Content Types */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                {/* Videos */}
                {lesson.contents.filter(content => content.type === 'video').length > 0 && (
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <div className='flex items-center gap-2 mb-2'>
                      <IconVideo className='w-5 h-5 text-blue-600' />
                      <h5 className='font-medium'>Videos</h5>
                    </div>
                    <div className='space-y-2'>
                      {lesson.contents
                        .filter(content => content.type === 'video')
                        .map(content => (
                          <div key={content.id} className='flex items-center gap-2 text-sm'>
                            <IconPlayerPlay className='w-4 h-4 text-blue-600' />
                            <span>{content.title}</span>
                            <span className='text-gray-500'>({content.duration} min)</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Archivos */}
                {lesson.contents.filter(content => content.type === 'pdf').length > 0 && (
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <div className='flex items-center gap-2 mb-2'>
                      <IconFile className='w-5 h-5 text-green-600' />
                      <h5 className='font-medium'>Archivos</h5>
                    </div>
                    <div className='space-y-2'>
                      {lesson.contents
                        .filter(content => content.type === 'pdf')
                        .map(content => (
                          <div key={content.id} className='flex items-center gap-2 text-sm'>
                            <IconDownload className='w-4 h-4 text-green-600' />
                            <span>{content.title}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Lecturas */}
                {lesson.contents.filter(content => content.type === 'text').length > 0 && (
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <div className='flex items-center gap-2 mb-2'>
                      <IconBook className='w-5 h-5 text-purple-600' />
                      <h5 className='font-medium'>Lecturas</h5>
                    </div>
                    <div className='space-y-2'>
                      {lesson.contents
                        .filter(content => content.type === 'text')
                        .map(content => (
                          <div key={content.id} className='flex items-center gap-2 text-sm'>
                            <IconFileText className='w-4 h-4 text-purple-600' />
                            <span>{content.title}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Quizzes */}
                {lesson.contents.filter(content => content.type === 'quiz').length > 0 && (
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <div className='flex items-center gap-2 mb-2'>
                      <IconCheck className='w-5 h-5 text-orange-600' />
                      <h5 className='font-medium'>Quizzes</h5>
                    </div>
                    <div className='space-y-2'>
                      {lesson.contents
                        .filter(content => content.type === 'quiz')
                        .map(content => (
                          <div key={content.id} className='flex items-center gap-2 text-sm'>
                            <IconCheck className='w-4 h-4 text-orange-600' />
                            <span>{content.title}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

function ParticipantCard({ participant }: { participant: CourseParticipant }) {
  return (
    <div className='flex items-center justify-between p-4 border rounded-lg'>
      <div className='flex items-center gap-4'>
        <Avatar>
          <AvatarImage src={participant.avatar} />
          <AvatarFallback>{participant.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className='font-medium'>{participant.name}</h4>
          <p className='text-sm text-gray-500'>{participant.email}</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Badge variant={participant.role === 'instructor' ? 'default' : 'secondary'}>
          {participant.role === 'instructor' ? 'Instructor' : 'Estudiante'}
        </Badge>
        <div className='w-24'>
          <Progress value={participant.progress} className='h-2' />
        </div>
      </div>
    </div>
  )
}
