package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String userType;
    private String email;
    private String name;
}
