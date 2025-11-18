import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema, TodoInput } from '@/lib/validations/todo';
import { Todo, useTodos } from '@/hooks/useTodos';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Pencil, X, Check } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTodo, deleteTodo, toggleComplete } = useTodos();

  const form = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description || '',
    },
  });

  const onToggleComplete = () => {
    toggleComplete.mutate({ id: todo.id, completed: !todo.completed });
  };

  const onDelete = () => {
    deleteTodo.mutate(todo.id);
  };

  const onSubmit = async (data: TodoInput) => {
    await updateTodo.mutateAsync({
      id: todo.id,
      updates: {
        title: data.title,
        description: data.description || null,
      },
    });
    setIsEditing(false);
  };

  const onCancel = () => {
    form.reset({
      title: todo.title,
      description: todo.description || '',
    });
    setIsEditing(false);
  };

  return (
    <Card className="p-4 transition-all hover:shadow-md">
      {isEditing ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Input
              {...form.register('title')}
              placeholder="Title"
              className="font-medium"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
            )}
          </div>
          <div>
            <Textarea
              {...form.register('description')}
              placeholder="Description (optional)"
              className="min-h-[80px]"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={onToggleComplete}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-foreground ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mt-1 ${todo.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                  {todo.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
