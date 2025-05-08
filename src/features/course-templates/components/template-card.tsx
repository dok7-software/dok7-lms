import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoreVertical, Clock, BookOpen } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface Template {
  id: string
  title: string
  description: string
  image: string
  modules: number
  category: string
  estimatedTime: string
}

interface TemplateCardProps {
  template: Template
  onViewDetail: (template: Template) => void
  onEdit: (template: Template) => void
  onDelete: (template: Template) => void
}

export function TemplateCard({ template, onViewDetail, onEdit, onDelete }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <img
            src={template.image}
            alt={template.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute right-2 top-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewDetail(template)}>
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(template)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(template)}
                >
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{template.category}</Badge>
          </div>
          <h3 className="line-clamp-1 text-lg font-semibold">{template.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {template.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{template.modules} módulos</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{template.estimatedTime}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onViewDetail(template)}>
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  )
} 