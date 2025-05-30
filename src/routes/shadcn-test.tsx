import { createFileRoute } from '@tanstack/react-router';
import { TestShadcn } from '../components/TestShadcn';

export const Route = createFileRoute('/shadcn-test')({
  component: ShadcnTestPage,
});

function ShadcnTestPage() {
  return (
    <div className="container mx-auto py-8">
      <TestShadcn />
    </div>
  );
}