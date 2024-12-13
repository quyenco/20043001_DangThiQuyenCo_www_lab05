package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "candidate")
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "dob",nullable = false)
    private LocalDate dob;

    @Column(name = "email" ,nullable = true)
    private String email;

    @Column(name = "full_name",nullable = true)
    private String fullName;

    @Column(name = "phone", length = 15,nullable = true)
    private String phone;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "address", nullable = false)
    private Address address = new Address(1L, "chua co dia chi");

    @OneToMany(mappedBy = "can")
    private List<CandidateSkill> candidateSkills;

    @OneToMany(mappedBy = "candidate")
    private List<Experience> experiences;

    @Column(nullable = false)
    private String password;

    public Candidate(String email, String password) {
        this.email = email;
        this.password = password;
    }

}