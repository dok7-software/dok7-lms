import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  image: z.string().min(1, 'La imagen es requerida'),
  modules: z.string().min(1, 'El número de módulos es requerido'),
  category: z.string().min(1, 'La categoría es requerida'),
  estimatedTime: z.string().min(1, 'El tiempo estimado es requerido'),
})

interface TemplateFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  onCancel: () => void
  initialValues?: {
    title: string
    description: string
    image: string
    modules: string
    category: string
    estimatedTime: string
  }
}

const categories = [
  'Desarrollo Web',
  'Diseño UI/UX',
  'Marketing Digital',
  'Programación',
  'Negocios',
  'Otros',
]

export default function CreateTemplateForm({
  onSubmit,
  onCancel,
  initialValues,
}: TemplateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      image: '',
      modules: '',
      category: '',
      estimatedTime: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingresa la descripción"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de la imagen</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa la URL de la imagen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="modules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de módulos</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ingresa el número de módulos"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiempo estimado</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: 4 semanas, 2 meses"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {initialValues ? 'Guardar cambios' : 'Crear plantilla'}
          </Button>
        </div>
      </form>
    </Form>
  )
} 