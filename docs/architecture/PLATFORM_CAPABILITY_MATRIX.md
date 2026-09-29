# Ma trận năng lực & chính sách nền tảng (bộ v2026.09)

Dùng cho Policy Engine (GĐ 5) và màn **18 · Chính sách & Tuân thủ**. Chính sách nền tảng thay đổi thường xuyên — **mọi dòng phải được xác minh lại trên trung tâm chính sách / Seller Center Việt Nam ở GĐ 0**, sau đó mỗi tháng.

| Khả năng | YouTube | Facebook | TikTok Shop (VN) | Shopee Live (VN) |
|---|---|---|---|---|
| Kết nối tài khoản | Đăng nhập Google (OAuth, YouTube Data API) | Trang: Facebook Login (OAuth, cần App Review) · Trang cá nhân: stream key từ Live Producer | Server URL + stream key (tài khoản đủ điều kiện LIVE) | RTMP URL + stream key (phát bằng OBS) |
| Tạo phiên tự động | Có | Có (Trang) | Không — tạo tay, dán key | Không — Livestream API chỉ mở cho TW/ID/TH |
| Đọc bình luận qua API | Có | Có (Trang) | Không có API chính thức | Không có ở VN |
| Trả lời bình luận qua API | Có (tên kênh) | Có (tên Trang) | Không → người vận hành | Không → người vận hành |
| AI Host (hình + giọng AI) | Được, khai báo nội dung tổng hợp | Được, gắn nhãn AI | **Không** — LIVE bán hàng cấm giọng AI / host AI (7/2026) | Chưa xác nhận → tắt mặc định |
| Hybrid (người thật nói, AI nhắc) | Được | Được | Được — cách khuyên dùng | Được — cách khuyên dùng |
| Phát lại video ghi sẵn | Được | Được, ghi rõ "đã ghi hình trước" | Không (nội dung không nguyên bản) | Không — có thể bị dừng ngay (từ 06/04/2026) |
| Phát chung luồng với nền tảng khác | Được | Được | Không phát đồng thời | Hạn chế — ưu tiên phiên riêng |
| Bố cục khuyến nghị | 16:9 | 16:9 | 9:16 | 9:16 |
| Nhãn nội dung AI | Bắt buộc mỗi khi có hình/giọng do AI tạo | ← | ← | ← |

## Quy tắc hệ thống suy ra

1. Phiên **AI Host** chỉ cho chọn YouTube + Facebook; TikTok Shop / Shopee → nút "Tạo phiên Hybrid riêng".
2. TikTok Shop luôn là **phiên riêng** (nội dung, người dẫn riêng) — không dùng chung luồng với kênh khác.
3. Phiên **Hybrid** phải có người dẫn thật được xếp ca trong Lịch phát sóng.
4. Bình luận TikTok/Shopee: người vận hành xử lý trên app; MateLive không dùng thư viện không chính thức mặc định (rủi ro điều khoản) — cân nhắc lại ở GĐ 6.
5. Chính sách lưu dạng dữ liệu có phiên bản (`platform_policy_version`: hiệu lực từ/đến, nguồn, người xác minh) — đổi luật là cập nhật dữ liệu, không sửa code.

## Giọng nói & hình ảnh AI

- VietTTS (`dangvansam/viet-tts`): mã nguồn Apache-2.0 nhưng **model đã huấn luyện là CC BY-NC** → không dùng cho livestream bán hàng. Mọi model GitHub phải kiểm tra license của trọng số, không chỉ của code.
- Nhân bản giọng / khuôn mặt người thật: chỉ khi có giấy đồng ý của chủ giọng / chủ hình.

## Nguồn tham khảo (cần xác minh lại)

- Shopee Open Platform — Livestream API (TW/ID/TH): https://github.com/congminh1254/shopee-sdk/blob/main/docs/managers/livestream.md
- TikTok Shop cấm giọng AI trong LIVE bán hàng (7/2026): https://www.techtimes.com/articles/320624/20260715/tiktok-shop-bans-ai-voices-live-commerce-streams-violations-now-dent-account-health-score.htm · https://ppc.land/tiktok-shops-quality-rules-ban-ai-voices-and-still-images-from-lives/ · https://www.switcherstudio.com/whats-new/tiktok-bans-ai-voices-from-shopping-livestreams
- Meta Live Video API: https://developers.facebook.com/docs/live-video-api/
- VietTTS license: https://github.com/dangvansam/viet-tts
- TikTok Shop VN (không phát đồng thời, không phát lại) và Shopee VN (vi phạm livestream phát lại từ 06/04/2026): theo nghiên cứu ở bước trước của dự án — cần đối chiếu Seller Center VN.
