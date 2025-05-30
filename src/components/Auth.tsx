import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: "pending" | "idle" | "success" | "error";
  afterSubmit?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{actionText}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Username
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="mt-1.5"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                className="mt-1.5"
              />
            </div>
            <Button
              type="submit"
              className={cn("w-full", status === "pending" && "opacity-70")}
              disabled={status === "pending"}
            >
              {status === "pending" ? "Loading..." : actionText}
            </Button>
            {afterSubmit && (
              <div className="flex justify-center">{afterSubmit}</div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
