package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.CandidateRepository;

import java.util.List;

@Service
public class CandidateSkillService {
    @Autowired
    private CandidateRepository candidateRepository;

//    public List<CandidateSkill> getSkillsByCandidateId(Long candidateId) {
//        return candidateSkillRepository.findByCanId(candidateId);
//    }
}
