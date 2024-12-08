package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.SkillService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/skill")
public class SkillController {
    @Autowired
    private SkillService skillService;
}
