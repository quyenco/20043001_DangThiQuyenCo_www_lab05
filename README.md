"# 20043001_DangThiQuyenCo_www_lab05" 
Thiết kế trang web tìm việc theo mô hình kiến trúc Layer, áp dụng được Spring vào vào thực tiễn.
1. Mô tả chức năng
Dự án website tìm việc được chia thành các chức năng chính như sau:
Chức năng cho ứng viên
•	Đăng ký và đăng nhập:
o	Ứng viên có thể tạo tài khoản, đăng nhập vào hệ thống bằng email và mật khẩu.
•	Quản lý hồ sơ cá nhân:
o	Ứng viên có thể cập nhật thông tin cá nhân (tên, kỹ năng, kinh nghiệm).
o	Hồ sơ được lưu trong cơ sở dữ liệu và có thể chỉnh sửa.
•	Tìm kiếm công việc:
o	Ứng viên có thể tìm kiếm công việc dựa trên các tiêu chí như vị trí, ngành nghề, và mức lương.
o	Kết quả trả về qua API từ backend.
Chức năng cho nhà tuyển dụng
•	Đăng ký và quản lý tài khoản công ty:
o	Nhà tuyển dụng có thể đăng ký tài khoản và cập nhật thông tin công ty.
•	Đăng tin tuyển dụng:
o	Nhà tuyển dụng tạo bài đăng tuyển dụng với các thông tin như: vị trí cần tuyển, yêu cầu, mức lương.
o	Tin tuyển dụng được lưu vào database và hiển thị trên trang tìm việc.
2. Giao diện màn hình 
Giao diện đăng nhập: Nhập đúng mail và mật khẩu sẽ chuyển hướng sang trang Home, nếu sai sẽ thông báo.
 ![image](https://github.com/user-attachments/assets/af2994ae-e72b-4ce9-93ad-94de0aec6d8f)

Giao diện đăng ký: tạo tài khoản Candidate hoặc Company bằng email và mật khẩu.
 ![image](https://github.com/user-attachments/assets/e95bfb3b-ad6b-4a33-adee-ec9747b19bca)

Giao diện Home: khi đăng nhập thành công sẽ hiển thị trang chứa các công việc đã được đăng, nếu company đăng nhập thì sẽ hiển thị 1 button đăng tin tuyển dụng.
 ![image](https://github.com/user-attachments/assets/d641b993-0fcd-4d4a-8291-2c52ae74a753)

Trang đăng tin tuyển dụng: tạo 1 tin tuyển dụng với các thông tin: tên công việc, mô tả công việc, có thể chọn 0 hoặc nhiều kỹ năng dựa trên các kỹ năng có sẵn, ngoài ra có nút thêm kỹ năng mới. Sau khi chọn cấp độ kỹ năng, hoặc xóa kỹ năng đã chọn.
 ![image](https://github.com/user-attachments/assets/cfb99571-a359-49e8-8320-7dc358fd35d2)

Thêm kỹ năng mới: nhập các thông tin như tên kỹ năng, mô tả và cấp độ sau đó nhấn thêm.
 ![image](https://github.com/user-attachments/assets/8d131135-d607-438a-9ca3-a1bf03834950)

Trang cập nhật thông tin công ty: cập nhật các thông tin của công ty và địa chỉ của công ty.
 ![image](https://github.com/user-attachments/assets/9cecf21d-e81d-4dca-9fb0-9509ba0a836c)

Trang cập nhật thông tin candidate: chứa các ô cập nhật thông tin candidate và địa chỉ của candidate.
 ![image](https://github.com/user-attachments/assets/3b40ac62-d11a-43dd-8248-572e62e2a86e)

 
