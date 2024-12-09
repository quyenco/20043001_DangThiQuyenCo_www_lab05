package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class JobSkillRequest {
    private Long skillId;  // ID của skill
    private Integer skillLevel;  // Mức độ kỹ năng (0: Beginner, 1: Intermediate, 2: Expert)

}