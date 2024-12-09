package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillRequest {
    private String name;
    private String desc;
    private String type;
}
