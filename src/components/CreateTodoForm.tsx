import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema, TodoInput } from '@/lib/validations/todo';
import { useTodos } from '@/hooks/useTodos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export const CreateTodoForm = () => {
  const { createTodo } = useTodos();

  const form = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: TodoInput) => {
    await createTodo.mutateAsync({
      title: data.title,
      description: data.description,
    });
    form.reset();
  };

  return (
    <Card className="p-4 bg-card">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Input
            {...form.register('title')}
            placeholder="What needs to be done?"
            className="text-base"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>
        <div>
          <Textarea
            {...form.register('description')}
            placeholder="Add a description (optional)"
            className="min-h-[80px]"
          />
          {form.formState.errors.description && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <Plus className="h-4 w-4 mr-2" />
          {form.formState.isSubmitting ? 'Adding...' : 'Add Todo'}
        </Button>
      </form>
    </Card>
  );
};
