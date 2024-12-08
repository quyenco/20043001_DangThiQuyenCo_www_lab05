package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;


import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {
    private Long id;
    private String title;
    private String jobDesc;
    private String companyName;

}

