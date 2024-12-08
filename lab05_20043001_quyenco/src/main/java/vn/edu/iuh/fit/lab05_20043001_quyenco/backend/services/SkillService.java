package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.SkillRepository;

@Service
public class SkillService {
    @Autowired
    private SkillRepository skillRepository;
}
