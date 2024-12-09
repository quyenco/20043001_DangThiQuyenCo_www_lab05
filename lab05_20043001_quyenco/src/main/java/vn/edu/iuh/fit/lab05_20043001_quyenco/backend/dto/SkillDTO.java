package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;

import lombok.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.enums.SkillLevel;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.enums.SkillType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SkillDTO {
    private String skillName;
    private SkillType type;
    private SkillLevel level;
    private String description;
    private String additionalInfo;
}
