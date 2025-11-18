import { useAuth } from '@/hooks/useAuth';
import { useTodos } from '@/hooks/useTodos';
import { CreateTodoForm } from '@/components/CreateTodoForm';
import { TodoItem } from '@/components/TodoItem';
import { Button } from '@/components/ui/button';
import { LogOut, CheckCircle2 } from 'lucide-react';

const Todos = () => {
  const { user, signOut } = useAuth();
  const { todos, isLoading } = useTodos();

  const completedCount = todos?.filter(todo => todo.completed).length || 0;
  const totalCount = todos?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Todo App</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">My Tasks</h2>
            <p className="text-muted-foreground">
              {completedCount} of {totalCount} completed
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <CreateTodoForm />

          {isLoading ? (
            <div className="text-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading todos...</p>
            </div>
          ) : todos && todos.length > 0 ? (
            <div className="space-y-3">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">No todos yet</h3>
              <p className="text-muted-foreground">Create your first todo to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Todos;
