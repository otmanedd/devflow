package com.devflow.devflow.workspace;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final WorkspaceRepository workspaceRepository;

    public WorkspaceController(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    @GetMapping
    public List<Workspace> getAll() {
        return workspaceRepository.findAll();
    }

    @PostMapping
    public Workspace create(@RequestBody Workspace workspace) {
        return workspaceRepository.save(workspace);
    }
}
