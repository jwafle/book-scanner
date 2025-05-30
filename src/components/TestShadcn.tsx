import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function TestShadcn() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Shadcn/UI Test</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="default">Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <div className="flex gap-4 flex-wrap mt-4">
          <Button size="default">Default Size</Button>
          <Button size="sm">Small Size</Button>
          <Button size="lg">Large Size</Button>
          <Button size="icon">🔍</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the main content of the card. You can put any
                information here.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Card</CardTitle>
              <CardDescription>Example of a feature highlight</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Shadcn/UI provides beautiful, accessible components that work
                with your Tailwind CSS setup.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
