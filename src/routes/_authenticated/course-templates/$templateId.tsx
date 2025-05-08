import { createFileRoute } from '@tanstack/react-router'
import { mockTemplates } from '@/features/course-templates/data/mock-templates'

export const Route = createFileRoute('/_authenticated/course-templates/$templateId')({
  component: TemplateDetail,
  loader: ({ params }) => {
    const template = mockTemplates.find((t) => t.id === params.templateId)
    if (!template) {
      throw new Error('Template not found')
    }
    return template
  },
})

function TemplateDetail() {
  const template = Route.useLoaderData()
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{template.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={template.image}
            alt={template.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">{template.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {template.modules} módulos
            </span>
            <span className="text-sm text-muted-foreground">
              {template.estimatedTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Categoría:</span>
            <span className="text-sm text-muted-foreground">
              {template.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 