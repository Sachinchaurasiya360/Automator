"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
import { Plus, FolderOpen, ArrowRight } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
}

export function DashboardContent() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get("/api/dashboard");
        setProjects(res.data.projects);
      } catch {
        // ignore fetch errors on load
      } finally {
        setLoading(false);
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

  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-gray-400">
            Dashboard
          </p>
          <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-gray-900">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-[14px] text-gray-500">
            {loading
              ? "Loading your projects…"
              : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 rounded-[10px] bg-gray-900 px-4 text-[13.5px] font-medium text-white hover:bg-gray-800">
              <Plus className="mr-1.5 size-3.5" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
            </DialogHeader>
            {error && (
              <p className="rounded-[8px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700">
                {error}
              </p>
            )}
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
              <Button
                onClick={handleSubmit}
                className="h-9 rounded-[10px] bg-gray-900 px-4 text-[13.5px] font-medium text-white hover:bg-gray-800"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-2 border-b border-gray-200" />

      {/* Content */}
      {loading ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-[12px] border border-gray-200 bg-white p-6"
            >
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-full rounded bg-gray-100" />
              <div className="mt-6 h-3 w-1/4 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-24 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-[12px] border border-gray-200 bg-gray-50">
            <FolderOpen className="size-5 text-gray-400" />
          </div>
          <p className="text-[15px] font-medium text-gray-900">No projects yet</p>
          <p className="text-[13.5px] text-gray-500">
            Create your first project to start building workflows.
          </p>
          <Button
            onClick={() => setOpen(true)}
            className="mt-2 h-9 rounded-[10px] bg-gray-900 px-4 text-[13.5px] font-medium text-white hover:bg-gray-800"
          >
            <Plus className="mr-1.5 size-3.5" />
            New Project
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group rounded-[12px] border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-[15px] font-semibold text-gray-900">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-[13px] text-gray-500">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Link
                  href={`/workflow/${project.id}`}
                  className="inline-flex items-center gap-1 text-[12.5px] font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  Open workflow
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
