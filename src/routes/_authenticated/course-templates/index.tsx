import { createFileRoute } from '@tanstack/react-router'
import TemplateList from '@/features/course-templates'

export const Route = createFileRoute('/_authenticated/course-templates/')({
  component: TemplateList,
}) 