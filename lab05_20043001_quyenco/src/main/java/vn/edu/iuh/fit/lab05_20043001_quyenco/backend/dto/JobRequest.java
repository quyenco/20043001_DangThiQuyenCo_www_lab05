package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
    private String jobName;
    private String jobDesc;
    private List<JobSkillRequest> skills;
}



