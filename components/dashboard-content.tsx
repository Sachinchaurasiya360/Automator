"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import axios from "axios";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
}

export function DashboardContent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get("/api/dashboard");
        setProjects(res.data.projects);
      } catch {
        // ignore fetch errors on load
      }
    }
    fetchProjects();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit() {
    try {
      const res = await axios.post("/api/dashboard", {
        ...formData,
      });
      setProjects([...projects, res.data.project]);
      setFormData({ title: "", description: "" });
      setError("");
      setOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error);
      }
    }
  }

  return (
    <div className="mt-4 px-10">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="p-2">Create Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
            </DialogHeader>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Project Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="My awesome project"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Input
                  id="description"
                  placeholder="What is this project about?"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button onClick={handleSubmit}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/project/${project.id}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Project
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
