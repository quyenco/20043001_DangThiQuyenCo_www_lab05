package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Candidate;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Company;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.repositories.CandidateRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateService {
    @Autowired
    private CandidateRepository candidateRepository;

    public List<Candidate> getAll() {
        return candidateRepository.findAll();
    }

    public Candidate getById(Long id) {
        return candidateRepository.findById(id).get();
    }

    public Candidate updateCandidate(Long id, Candidate updatedCandidate) {
        Optional<Candidate> existingCandidateOptional = candidateRepository.findById(id);

        if (!existingCandidateOptional.isPresent()) {
            throw new IllegalArgumentException("Company with ID " + id + " not found.");
        }

        Candidate existingCandidate = existingCandidateOptional.get();

        // Update fields
        existingCandidate.setFullName(updatedCandidate.getFullName());
        existingCandidate.setEmail(updatedCandidate.getEmail());
        existingCandidate.setPhone(updatedCandidate.getPhone());
        existingCandidate.setDob(updatedCandidate.getDob());

        if (updatedCandidate.getAddress() != null) {
            existingCandidate.getAddress().setStreet(updatedCandidate.getAddress().getStreet());
            existingCandidate.getAddress().setCity(updatedCandidate.getAddress().getCity());
            existingCandidate.getAddress().setZipcode(updatedCandidate.getAddress().getZipcode());
        }

        return candidateRepository.save(existingCandidate);


    }
}
