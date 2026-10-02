package com.devflow.devflow.project;

import com.devflow.devflow.workspace.Workspace;
import com.devflow.devflow.workspace.WorkspaceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final WorkspaceRepository workspaceRepository;

    public ProjectController(
            ProjectRepository projectRepository,
            WorkspaceRepository workspaceRepository) {
        this.projectRepository = projectRepository;
        this.workspaceRepository = workspaceRepository;
    }

    @GetMapping
    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    @PostMapping
    public Project create(@RequestBody Project project) {
        if (project.getWorkspace() == null || project.getWorkspace().getId() == null) {
            throw new IllegalArgumentException("workspace id is required");
        }

        Workspace workspace = workspaceRepository
                .findById(project.getWorkspace().getId())
                .orElseThrow();

        project.setWorkspace(workspace);

        return projectRepository.save(project);
    }
}
