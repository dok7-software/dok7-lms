import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SheetClose } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const estados = [
  { value: 'abierto', label: 'Abierto' },
  { value: 'en progreso', label: 'En progreso' },
  { value: 'cerrado', label: 'Cerrado' },
];

export interface CreateCourseFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  initialValues?: any;
}

export default function CreateCourseForm({ onSubmit, onCancel, initialValues }: CreateCourseFormProps) {
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
  });
  const [touched, setTouched] = useState<{[k: string]: boolean}>({});

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...form,
        ...initialValues,
        participants: initialValues.participants?.toString() ?? '',
        modules: initialValues.modules?.toString() ?? '',
      });
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    if (!initialValues) {
      setForm({
        title: '', description: '', image: '', participants: '', modules: '', startDate: '', endDate: '', status: '', category: '', instructor: ''
      });
      setTouched({});
    }
  };

  return (
    <form className="grid space-y-6 py-4 m-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">Título</Label>
          <Input 
            id="title" 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required 
            placeholder="Título del curso" 
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor" className="text-sm font-medium">Instructor</Label>
          <Input 
            id="instructor" 
            name="instructor" 
            value={form.instructor} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required 
            placeholder="Nombre del instructor"
            className="h-9"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">Descripción</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required 
            placeholder="Breve descripción del curso" 
            rows={3}
            className="resize-none"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image" className="text-sm font-medium">URL de imagen</Label>
          <Input 
            id="image" 
            name="image" 
            value={form.image} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required 
            placeholder="https://..."
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">Categoría</Label>
          <Input 
            id="category" 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required 
            placeholder="Ej: Programación"
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="participants" className="text-sm font-medium">Participantes</Label>
          <Input 
            id="participants" 
            name="participants" 
            type="number" 
            min={1} 
            value={form.participants} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required 
            placeholder="Ej: 50"
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="modules" className="text-sm font-medium">Módulos</Label>
          <Input 
            id="modules" 
            name="modules" 
            type="number" 
            min={1} 
            value={form.modules} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required 
            placeholder="Ej: 8"
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-sm font-medium">Fecha inicio</Label>
          <Input 
            id="startDate" 
            name="startDate" 
            type="date" 
            value={form.startDate} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-sm font-medium">Fecha fin</Label>
          <Input 
            id="endDate" 
            name="endDate" 
            type="date" 
            value={form.endDate} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            required
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">Estado</Label>
          <Select name="status" value={form.status} onValueChange={(value) => setForm(f => ({ ...f, status: value }))}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Selecciona estado" />
            </SelectTrigger>
            <SelectContent>
              {estados.map(e => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <SheetClose asChild>
            <Button variant="outline" type="button" onClick={onCancel} className="h-9">Cancelar</Button>
          </SheetClose>
        )}
        <Button type="submit" variant="default" className="h-9">{initialValues ? 'Guardar cambios' : 'Crear'}</Button>
      </div>
    </form>
  );
} 