package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.enums.SkillType;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "skill")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id", nullable = false)
    private Long id;

    @Column(name = "skill_description")
    private String skillDescription;

    @Column(name = "skill_name")
    private String skillName;

    @Column(name = "type")
    @Enumerated(EnumType.ORDINAL)
    private SkillType type;

    @OneToMany(mappedBy = "skill")
    private List<CandidateSkill> candidateSkills;

    @OneToMany(mappedBy = "skill")
    private List<JobSkill> jobSkills;
}