package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.enums.SkillLevel;

@Setter
@Getter
@Data

public class JobSkillDTO {
    private Long jobId;
    private Long skillId;
    private String moreInfos;
    private SkillLevel skillLevel;
}
