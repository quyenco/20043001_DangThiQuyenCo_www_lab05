package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.RegisterRequest;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Candidate;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.CandidateRepository;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.CompanyRepository;

@Service
public class UserService {
    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean emailExists(String email) {
        return candidateRepository.findByEmail(email) != null || companyRepository.findByEmail(email) != null;
    }
    public void saveCompany(Company company) {
        company.setPassword(passwordEncoder.encode(company.getPassword())); // Mã hóa mật khẩu
        companyRepository.save(company);
    }

    public void saveCandidate(Candidate candidate) {
        candidate.setPassword(passwordEncoder.encode(candidate.getPassword())); // Mã hóa mật khẩu
        candidateRepository.save(candidate);
    }

    public Object authenticateUser(String email, String rawPassword) {
        Candidate candidate = candidateRepository.findByEmail(email);
        if (candidate != null && passwordEncoder.matches(rawPassword, candidate.getPassword())) {
            return candidate;
        }

        Company company = companyRepository.findByEmail(email);
        if (company != null && passwordEncoder.matches(rawPassword, company.getPassword())) {
            return company;
        }

        return null;
    }

//    public String registerUser(RegisterRequest registerRequest) {
//        if (registerRequest.getUserType().equals("candidate")) {
//            Candidate candidate = new Candidate();
//            candidate.setEmail(registerRequest.getEmail());
//            candidate.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
//            candidateRepository.save(candidate);
//        } else if (registerRequest.getUserType().equals("company")) {
//            Company company = new Company();
//            company.setEmail(registerRequest.getEmail());
//            company.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
//            companyRepository.save(company);
//        } else {
//            return "Invalid user type";
//        }
//        return "Registration successful!";
//    }
}
