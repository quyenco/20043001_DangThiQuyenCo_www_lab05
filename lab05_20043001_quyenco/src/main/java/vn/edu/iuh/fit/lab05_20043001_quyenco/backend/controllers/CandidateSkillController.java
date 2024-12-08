package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.CandidateSkillService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/candidate-skill")
public class CandidateSkillController {
    @Autowired
    private CandidateSkillService candidateSkillService;
}
