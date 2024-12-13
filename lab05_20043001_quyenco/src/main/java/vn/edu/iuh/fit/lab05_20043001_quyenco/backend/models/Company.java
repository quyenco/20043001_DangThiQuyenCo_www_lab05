package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comp_id", nullable = false)
    private Long id;

    @Column(name = "about", length = 2000, nullable = true)
    private String about;

    @Column(name = "email", nullable = true)
    private String email;

    @Column(name = "comp_name", nullable = true)
    private String compName;

    @Column(name = "phone", nullable = true)
    private String phone;

    @Column(name = "web_url", nullable = true)
    private String webUrl;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY,  optional = true)
    @JoinColumn(name = "address", nullable = false)
    private Address address = new Address(1L, "chua co dia chi");

    @OneToMany(mappedBy = "company")
    private List<Job> jobs;

    @Column(nullable = true)
    private String password;

    public Company(String email, String password) {
        this.email = email;
        this.password = password;
    }
}