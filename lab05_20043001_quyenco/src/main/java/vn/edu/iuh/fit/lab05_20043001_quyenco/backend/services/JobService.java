package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.JobDetailDTO;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.SkillDTO;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Job;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.JobSkill;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.JobRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public JobDetailDTO getJobDetail(Long jobId) {
        Optional<Job> job = jobRepository.findById(jobId);
        if (job.isEmpty()) {
            return null;
        }

        Job jobEntity = job.get();
        JobDetailDTO dto = new JobDetailDTO();
        dto.setJobName(jobEntity.getJobName());
        dto.setJobDesc(jobEntity.getJobDesc());
        dto.setAddress(jobEntity.getCompany().getAddress().getStreet() + "," +jobEntity.getCompany().getAddress().getCity());
        dto.setCompanyId(jobEntity.getCompany().getId().toString());
        dto.setCompanyName(jobEntity.getCompany().getCompName());
        dto.setSkills(jobEntity.getJobSkills().stream().map(this::mapToSkillDTO).collect(Collectors.toList()));
        return dto;
    }
    private SkillDTO mapToSkillDTO(JobSkill jobSkill) {
        SkillDTO skillDTO = new SkillDTO();
        skillDTO.setSkillName(jobSkill.getSkill().getSkillName());
        skillDTO.setType(jobSkill.getSkill().getType());
        skillDTO.setLevel(jobSkill.getSkillLevel());
        skillDTO.setDescription(jobSkill.getSkill().getSkillDescription());
        skillDTO.setAdditionalInfo(jobSkill.getMoreInfos());
        return skillDTO;
    }


}
