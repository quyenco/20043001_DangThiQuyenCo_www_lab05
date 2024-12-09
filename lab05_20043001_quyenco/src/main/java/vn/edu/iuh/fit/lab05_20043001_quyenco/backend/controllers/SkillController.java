package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.dto.SkillRequest;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.enums.SkillType;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.models.Skill;
import vn.edu.iuh.fit.lab05_20043001_quyenco.backend.services.SkillService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/skills")
public class SkillController {
    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkills();
        if (skills.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(skills);
    }

    @PostMapping("/add")
    public ResponseEntity<Skill> addSkill(@RequestBody SkillRequest skillRequest) {
        try {
            // Kiểm tra các trường không được để trống
            if (skillRequest.getName() == null || skillRequest.getName().isEmpty()) {
                throw new IllegalArgumentException("Tên kỹ năng không được để trống");
            }
            if (skillRequest.getDesc() == null || skillRequest.getDesc().isEmpty()) {
                throw new IllegalArgumentException("Mô tả không được để trống");
            }
            if (skillRequest.getType() == null || skillRequest.getType().isEmpty()) {
                throw new IllegalArgumentException("Loại kỹ năng không được để trống");
            }

            // Chuyển đổi type thành Enum
            SkillType skillType;
            try {
                skillType = SkillType.valueOf(skillRequest.getType());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(null);  // Nếu giá trị type không hợp lệ
            }

            // Tạo mới đối tượng Skill
            Skill newSkill = new Skill();
            newSkill.setSkillName(skillRequest.getName());
            newSkill.setSkillDescription(skillRequest.getDesc());
            newSkill.setType(skillType);

            // Lưu vào cơ sở dữ liệu
            newSkill = skillService.addSkill(newSkill);

            return ResponseEntity.ok(newSkill);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);  // Trả về lỗi 400 nếu có lỗi nhập liệu
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(null);  // Trả về lỗi 500 nếu có lỗi hệ thống
        }
    }

}
