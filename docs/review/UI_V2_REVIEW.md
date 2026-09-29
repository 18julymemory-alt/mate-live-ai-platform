# Đánh giá bộ giao diện v2 (`MateLive_Premium_UI_9_Pages_v2.pdf`)

Ngày đánh giá: 29/09/2026 · Bản thay thế: `docs/ui-blueprint/MateLive_UI_Blueprint_v3.pdf`

Bản v2 gồm 9 trang, mỗi trang là **một ảnh do AI vẽ** (1672×941). Đẹp và đúng hướng nghề live bán hàng, nhưng chưa dùng trực tiếp làm bản code được: chữ không sửa được, có lỗi chữ, menu lệch nhau, thiếu nhiều luồng và có chỗ đi ngược chính sách nền tảng.

## Chấm điểm

| Tiêu chí | Điểm | Nhận xét |
|---|---|---|
| Thẩm mỹ | 8,5/10 | Tông tím nhất quán, KPI rõ, Control Room đúng nghề |
| Độ phủ chức năng | 6,5/10 | Thiếu luồng kết nối tài khoản, lịch, phân tích, quy tắc trả lời, chính sách |
| Khả thi kỹ thuật | 5/10 | AI "cầm sản phẩm" real-time; bình luận TikTok/Shopee VN không có API chính thức |
| Tuân thủ nền tảng | 4/10 | AI host phát đồng thời lên TikTok Shop + Shopee; không có nhãn AI; lộ SĐT/địa chỉ khách |
| Dùng làm bản code | 5/10 | Ảnh AI: lỗi chữ, số liệu mâu thuẫn, không có trạng thái lỗi/trống |

## Từng trang

| Trang v2 | Kết luận | Vấn đề chính | Trang v3 |
|---|---|---|---|
| 1 · Tổng quan | Giữ | Ngày 28/5/2024; "Gói còn 28 ngày" lệch với "23 ngày" ở các trang khác | 02 |
| 2 · Kênh & tài khoản | Sửa | Có nút "Thêm tài khoản" nhưng **không có luồng kết nối**; thiếu cột cách kết nối & khả năng từng tài khoản | 03, 04 |
| 3 · Sản phẩm & Affiliate | Giữ | Thiếu hồ sơ tư vấn đầy đủ cho AI; chưa chặn sản phẩm cấm quảng cáo | 05, 06 |
| 4 · AI nhân vật | Sửa | "Tư thế cầm sản phẩm" real-time không khả thi → clip dựng sẵn; thiếu nhãn nội dung AI | 07 |
| 5 · Tạo phiên live | Sửa lớn | Bật 4 kênh cùng lúc với AI host; lỗi chữ menu "Thiú pà nói"; bước "Thời lượng" chưa có màn | 11 |
| 6 · Giọng nói & Kịch bản | Tách đôi | Quá dày; thiếu quyền dùng thương mại của giọng GitHub; thiếu đồng ý khi nhân bản giọng | 08, 09 |
| 7 · Background & Scene | Giữ | Thiếu bản dọc 9:16 cho TikTok/Shopee và lớp nhãn AI | 10 |
| 8 · Control Room | Sửa | Menu riêng khác mọi trang; phát AI lên TikTok Shop & Shopee; thiếu "người thật tiếp quản" | 14 |
| 9 · Bình luận | Giữ | Phân loại rất tốt; hiện nguyên SĐT, địa chỉ khách; menu có cả "Bình luận & Chuyển đổi" lẫn "Bình luận" | 15, 16 |

## Thêm mới trong v3

Kết nối tài khoản Facebook (04) · Hồ sơ tư vấn sản phẩm (06) · Kịch bản AI động (09) · Lịch phát sóng + ca người dẫn (12) · Kết nối OBS (13) · Quy tắc trả lời tự động (16) · Phân tích & Báo cáo (17) · Chính sách & Tuân thủ (18) · Lộ trình code (19).

## Không đưa vào sản phẩm

- **"Ních ảo" tự bình luận / seeding.** Là tương tác giả: lừa người mua, vi phạm quy định của cả 4 nền tảng; khi bị phát hiện thường kéo theo khóa tài khoản shop thật.
- **Proxy, đổi IP, giả thiết bị để né kiểm duyệt.** Không làm tăng lượt tiếp cận (nền tảng xếp hạng live theo thời gian xem, tương tác thật, tính nguyên bản, sức khỏe tài khoản), còn khiến nhiều tài khoản bị coi là hành vi phối hợp không xác thực.

Thay bằng: trả lời bình luận thật trong vài giây và gọi tên khách, kịch bản AI đổi liên tục, người dẫn thật ở TikTok Shop/Shopee (Hybrid), minigame/voucher/flash deal chỉ trong live, relay SRT giữ luồng ổn định, video ngắn kéo khách trước live, quảng cáo chính chủ, KOC thật, nhiều tài khoản **chính chủ** + mod/nhân viên thật.
