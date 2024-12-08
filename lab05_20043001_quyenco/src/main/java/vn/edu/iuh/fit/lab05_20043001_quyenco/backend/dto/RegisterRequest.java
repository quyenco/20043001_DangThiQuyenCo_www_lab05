package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String userType; // "candidate" or "company"
}
