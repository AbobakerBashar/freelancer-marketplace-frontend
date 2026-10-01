"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useDeleteProject } from "@/features/projects/hooks";
import { Project } from "@/features/projects/types";
import {
  currencyFormatter,
  formatStatus,
  getStatusColor,
} from "@/utils/projects";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function ProjectCard({
  project,
  isDetailed,
}: {
  project: Project;
  isDetailed?: boolean;
}) {
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);

  const hasRange = project.budgetMin !== null && project.budgetMax !== null;
  const hasMinOnly = project.budgetMin !== null && project.budgetMax === null;
  const hasMaxOnly = project.budgetMin === null && project.budgetMax !== null;

  const isAllowedToEdit =
    project.status === "OPEN" || project.status === "DRAFT";

  return (
    <>
      <Card className="border-border/70 bg-card/90 transition-shadow hover:shadow-lg">
        <CardHeader className="pb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <Badge className={`p-3 ${getStatusColor(project.status)}`}>
                {formatStatus(project.status)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Posted {format(new Date(project.createdAt), "MMM d, yyyy")}
            </p>
          </div>
          <div className="flex gap-2">
            {isAllowedToEdit && (
              <Link href={`/dashboard/my-projects/${project.id}/edit`}>
                <Button size="sm">Edit project</Button>
              </Link>
            )}
            {isDetailed ? (
              <Button
                onClick={() => setopenDeleteDialog(true)}
                size="sm"
                variant="destructive"
              >
                Delete project
              </Button>
            ) : (
              <Link href={`/dashboard/my-projects/${project.id}`}>
                <Button size="sm" variant="outline">
                  View details
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="leading-7 text-foreground/80 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="rounded-full">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="grid gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-muted-foreground">Budget</p>
              <p className="mt-1 font-semibold">
                {hasRange
                  ? `${currencyFormatter(project.currency).format(project.budgetMin as number)} - ${currencyFormatter(project.currency).format(project.budgetMax as number)}`
                  : hasMinOnly
                    ? `From ${currencyFormatter(project.currency).format(project.budgetMin as number)}`
                    : hasMaxOnly
                      ? `Up to ${currencyFormatter(project.currency).format(project.budgetMax as number)}`
                      : "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="mt-1 font-semibold">{project.budgetType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Deadline</p>
              <p className="mt-1 font-semibold">
                {project.deadline
                  ? format(new Date(project.deadline), "MMM d, yyyy")
                  : "No deadline"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="mt-1 font-semibold">
                {project.duration && project.durationUnit
                  ? `${project.duration} ${project.durationUnit.toLowerCase()}`
                  : "Flexible"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isDetailed && (
        <DeleteProjectDialog
          projectId={project.id}
          isOpen={openDeleteDialog}
          onClose={() => setopenDeleteDialog(false)}
        />
      )}
    </>
  );
}
export default ProjectCard;

function DeleteProjectDialog({
  projectId,
  isOpen,
  onClose,
}: {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const { mutateAsync: deleteProject, isPending: isDeleting } =
    useDeleteProject();

  // Handle the delete action
  const handleDelete = async () => {
    if (isDeleting || !projectId) return;

    const response = await deleteProject(projectId);
    if (response.success) {
      // Refresh the page to reflect the deletion & navigate back to the projects list

      router.refresh();
      router.replace("/dashboard/my-projects");
      toast.success("Project deleted successfully");

      // Close the dialog
      onClose();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <h3 className="text-lg font-semibold">Delete Project</h3>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this project? This action cannot be
            undone.
          </p>
        </DialogHeader>
        <div className="mt-4 flex justify-end gap-2">
          <Button disabled={isDeleting} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
