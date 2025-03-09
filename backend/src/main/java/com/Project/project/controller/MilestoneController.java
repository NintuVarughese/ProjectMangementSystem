/*package com.Project.project.controller;

import com.Project.project.model.Milestone;
import com.Project.project.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/milestones")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    // Add a milestone to a project
    @PostMapping("/add/{projectID}")
    public Milestone addMilestone(@PathVariable Long projectID, @RequestBody Milestone milestone) {
        return milestoneService.addMilestone(projectID, milestone);
    }

    // Get all milestones for a specific project
    @GetMapping("/project/{projectID}")
    public List<Milestone> getMilestonesByProject(@PathVariable Long projectID) {
        return milestoneService.getMilestonesByProject(projectID);
    }

    // Get a single milestone by ID
    @GetMapping("/{milestoneID}")
    public Optional<Milestone> getMilestoneById(@PathVariable Long milestoneID) {
        return milestoneService.getMilestoneById(milestoneID);
    }

    // Update a milestone
    @PutMapping("/update/{milestoneID}")
    public Milestone updateMilestone(@PathVariable Long milestoneID, @RequestBody Milestone milestone) {
        return milestoneService.updateMilestone(milestoneID, milestone);
    }

    // Delete a milestone
    @DeleteMapping("/delete/{milestoneID}")
    public String deleteMilestone(@PathVariable Long milestoneID) {
        milestoneService.deleteMilestone(milestoneID);
        return "Milestone with ID " + milestoneID + " has been deleted.";
    }
}
*/
package com.Project.project.controller;

import com.Project.project.model.Milestone;
import com.Project.project.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/milestones")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    // Add a milestone to a project
    @PostMapping("/add/{projectID}")
    public Milestone addMilestone(@PathVariable Long projectID, @RequestBody Milestone milestone) {
        return milestoneService.addMilestone(projectID, milestone);
    }

    // Get all milestones for a specific project
    @GetMapping("/project/{projectID}")
    public ResponseEntity<List<Milestone>> getMilestonesByProject(@PathVariable Long projectID) {
        List<Milestone> milestones = milestoneService.getMilestonesByProject(projectID);
        if (milestones.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(milestones);
        }
        return ResponseEntity.ok(milestones);
    }

    // Get a single milestone by ID
    @GetMapping("/{milestoneID}")
    public Optional<Milestone> getMilestoneById(@PathVariable Long milestoneID) {
        return milestoneService.getMilestoneById(milestoneID);
    }

    // Update a milestone
    @PutMapping("/update/{milestoneID}")
    public Milestone updateMilestone(@PathVariable Long milestoneID, @RequestBody Milestone milestone) {
        return milestoneService.updateMilestone(milestoneID, milestone);
    }

    // Delete a milestone
    @DeleteMapping("/delete/{milestoneID}")
    public String deleteMilestone(@PathVariable Long milestoneID) {
        milestoneService.deleteMilestone(milestoneID);
        return "Milestone with ID " + milestoneID + " has been deleted.";
    }
}
