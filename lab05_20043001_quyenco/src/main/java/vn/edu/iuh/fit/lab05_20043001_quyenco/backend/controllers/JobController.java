package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.JobDetailDTO;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.JobResponse;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Job;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.CandidateSkillRepository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.CandidateSkillService;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.JobService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService jobService;

    @Autowired
    private CandidateSkillRepository candidateSkillRepository;

    @GetMapping("/get-page")
    public ResponseEntity<?> getJobs(@RequestParam int page,
                                     @RequestParam(required = false) String search,
                                     @RequestParam(required = false) Long candidateId) {
        int pageSize = 6;
        Pageable pageable = PageRequest.of(page, pageSize);

        if (candidateId != null) {
            List<Long> skillIds = candidateSkillRepository.findSkillIdsByCandidateId(candidateId);
            List<Job> jobsBySkill = jobService.getJobsBySkills(skillIds);

            if (jobsBySkill.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(jobsBySkill); // Trả về danh sách công việc cho candidate
        }

        if (search != null && !search.isEmpty()) {
            Page<Job> searchResult = jobService.searchJobs(search, pageable);
            if (searchResult.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            Map<String, Object> response = new HashMap<>();
            response.put("content", searchResult.getContent().stream()
                    .map(job -> new JobResponse(job.getId(), job.getJobName(), job.getJobDesc(), job.getCompany().getCompName()))
                    .collect(Collectors.toList()));
            response.put("totalPages", searchResult.getTotalPages());
            response.put("totalElements", searchResult.getTotalElements());

            return ResponseEntity.ok(response);
        }

        Page<Job> allJobs = jobService.getAllJobs(pageable);
        if (allJobs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("content", allJobs.getContent().stream()
                .map(job -> new JobResponse(job.getId(), job.getJobName(), job.getJobDesc(), job.getCompany().getCompName()))
                .collect(Collectors.toList()));
        response.put("totalPages", allJobs.getTotalPages());
        response.put("totalElements", allJobs.getTotalElements());

        return ResponseEntity.ok(response);
    }



    @GetMapping("/{jobId}")
    public ResponseEntity<?> getJobDetail(@PathVariable Long jobId) {
        JobDetailDTO jobDetail = jobService.getJobDetail(jobId);
        if (jobDetail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(jobDetail);
    }


}

