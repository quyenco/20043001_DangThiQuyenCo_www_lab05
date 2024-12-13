package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "street", length = 150)
    private String street;

    @Column(name = "city", length = 50)
    private String city;

    @Column(name = "country")
    private Short country;

    @Column(name = "number", length = 20)
    private String number;

    @Column(name = "zipcode", length = 7)
    private String zipcode;

    @JsonIgnore
    @OneToOne(mappedBy = "address")
    private Candidate candidate;

    @JsonIgnore
    @OneToOne(mappedBy = "address")
    private Company company;


    public Address(long id ,String street  ){
        this.id = id;
        this.street = street;
    }
}