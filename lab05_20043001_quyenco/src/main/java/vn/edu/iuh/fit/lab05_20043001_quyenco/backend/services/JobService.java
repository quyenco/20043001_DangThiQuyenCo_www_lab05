package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Job;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.JobRepository;

import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    public Page<Job> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }

    public Page<Job> searchJobs(String search, Pageable pageable) {
        return jobRepository.searchJobs(search, pageable);
    }

    public List<Job> getJobsBySkills(List<Long> skillIds) {
        return jobRepository.findAll().stream()
                .filter(job -> job.getJobSkills().stream()
                        .anyMatch(jobSkill -> skillIds.contains(jobSkill.getSkill().getId())))
                .toList();
    }

}
