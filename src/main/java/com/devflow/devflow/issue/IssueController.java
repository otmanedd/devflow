package com.devflow.devflow.issue;

import com.devflow.devflow.project.Project;
import com.devflow.devflow.project.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;

    public IssueController(
            IssueRepository issueRepository,
            ProjectRepository projectRepository) {
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<Issue> getAll() {
        return issueRepository.findAll();
    }

    @PostMapping
    public Issue create(@RequestBody Issue issue) {
        if (issue.getProject() == null || issue.getProject().getId() == null) {
            throw new IllegalArgumentException("project id is required");
        }

        Project project = projectRepository
                .findById(issue.getProject().getId())
                .orElseThrow();

        issue.setProject(project);
        issue.setUpdatedAt(LocalDateTime.now());

        return issueRepository.save(issue);
    }

    @PutMapping("/{id}")
    public Issue update(@PathVariable Long id, @RequestBody Issue updated) {
        Issue issue = issueRepository.findById(id).orElseThrow();

        issue.setTitle(updated.getTitle());
        issue.setDescription(updated.getDescription());
        issue.setStatus(updated.getStatus());
        issue.setPriority(updated.getPriority());
        issue.setUpdatedAt(LocalDateTime.now());

        return issueRepository.save(issue);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        issueRepository.deleteById(id);
    }
}
