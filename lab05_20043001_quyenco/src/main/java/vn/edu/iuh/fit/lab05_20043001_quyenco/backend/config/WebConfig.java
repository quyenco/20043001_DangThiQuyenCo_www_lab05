package vn.edu.iuh.fit.lab05_20043001_quyenco.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Đảm bảo frontend gửi yêu cầu từ đúng domain
                .allowCredentials(true)  // Cho phép cookie/session nếu cần
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các method cần thiết
                .allowedHeaders("*");  // Cho phép tất cả header

    }
}
