package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;

import lombok.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Address;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobDetailDTO {
    private String jobName;
    private String jobDesc;
    private String address;
    private String companyId;
    private String companyName;
    private List<SkillDTO> skills;
}
