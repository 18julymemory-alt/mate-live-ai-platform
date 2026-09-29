# Lộ trình code MateLive AI Platform

**1 giai đoạn thiết kế + 12 giai đoạn code, chia 4 mốc.** Mỗi giai đoạn có điều kiện hoàn thành; chưa đạt thì không sang giai đoạn sau. Ước lượng cho 1 lập trình viên làm cùng AI agent: khoảng 22–28 tuần (5–7 tháng).

Màn hình tham chiếu: `docs/ui-blueprint/MateLive_UI_Blueprint_v3.pdf` (số màn ghi trong ngoặc).

## GĐ 0 — Thiết kế & chốt kiến trúc (không code) · 1–2 tuần

Bộ giao diện v3, sơ đồ dữ liệu, quyết định kỹ thuật (ADR), ma trận chính sách nền tảng đã xác minh lại trên Seller Center Việt Nam (`docs/architecture/PLATFORM_CAPABILITY_MATRIX.md`).

## Mốc A — Phát live được · 8–10 tuần

| GĐ | Nội dung | Màn |
|---|---|---|
| 1 | Nền móng: web Next.js theo bộ giao diện, API Node/TypeScript, PostgreSQL, Redis/BullMQ, đăng nhập, workspace, phân quyền, nhật ký, kho khóa mã hóa (stream key, token) | 02 |
| 2 | Kênh & tài khoản: Đăng nhập Google/YouTube, Facebook Login (Trang), stream key TikTok/Shopee, nhiều tài khoản mỗi nền tảng, làm mới token, kiểm tra kết nối | 03, 04 |
| 3 | Sản phẩm, affiliate, hồ sơ tư vấn: hàng thật / affiliate / số, link theo sàn, kiểm tra link chết, nhập Excel, hồ sơ tư vấn có phiên bản, chặn nhóm hàng cấm quảng cáo | 05, 06 |
| 4 | Media Engine: FFmpeg + MediaMTX, thư viện video, worker phát từng kênh độc lập, tự nối lại, relay SRT, xem trước | 13 |
| 5 | Tạo phiên (chế độ, kênh, thời lượng), lịch + ca người dẫn, bộ chặn chính sách, MateLive Agent cho OBS (obs-websocket), Control Room bản đầu | 11, 12, 13, 14, 18 |

**Hoàn thành khi:** phát 2 giờ lên YouTube + Facebook và 1 phiên TikTok Shop qua OBS; rớt 1 kênh không ảnh hưởng kênh khác.

## Mốc B — Bình luận & AI bán hàng · 5–6 tuần

| GĐ | Nội dung | Màn |
|---|---|---|
| 6 | Comment Hub: gom bình luận YouTube + Facebook qua API theo thời gian thực, che thông tin cá nhân; TikTok/Shopee do người vận hành xử lý | 15 |
| 7 | AI phân loại & trả lời: chuyển đổi trực tiếp / tư vấn / hỏi giá / chốt đơn / khiếu nại / spam; tô đậm chuyển đổi; trả lời theo hồ sơ (kèm nguồn); 3 chế độ AI tự động · AI gợi ý-duyệt · thủ công | 15, 16 |
| 8 | Kịch bản AI động: theo giai đoạn, viết lại theo bình luận, không lặp nguyên văn, teleprompter cho người dẫn Hybrid | 09 |

**Hoàn thành khi:** ≥ 90% bình luận chuyển đổi được nhận đúng trên bộ thử 500 bình luận tiếng Việt thật; trả lời < 3 giây; 0 câu nằm ngoài hồ sơ.

## Mốc C — AI Host · 6–8 tuần

| GĐ | Nội dung | Màn |
|---|---|---|
| 9 | AI giọng nói: kết nối nhà cung cấp giọng Việt (API thương mại; model GitHub khi license cho phép), nhấn nhá / ngắt nghỉ, thư viện giọng, đồng ý khi nhân bản giọng | 08 |
| 10 | AI nhân vật & người dẫn ảo: tạo nhân vật, clip cầm sản phẩm dựng sẵn, nhép miệng theo giọng trên GPU, ghép scene, nhãn AI; chỉ bật ở nền tảng cho phép | 07, 14 |
| 11 | Background & Scene Studio: nền AI, mẫu scene, lớp, bản 16:9 + 9:16, đồng bộ lên OBS | 10 |

**Hoàn thành khi:** AI Host chạy liên tục 4 giờ trên YouTube/Facebook; độ trễ trả lời bằng giọng < 4 giây; GPU không quá tải.

## Mốc D — Vận hành · 3–4 tuần

| GĐ | Nội dung | Màn |
|---|---|---|
| 12 | Phân tích bán hàng & kỹ thuật, n8n (lịch, cảnh báo Telegram/Zalo, báo cáo sau live), kiểm tra bảo mật, chạy thử 2 → 4 → 8 → 12 giờ với 1 workspace thật | 02, 17 |

**Hoàn thành khi:** 2 tuần chạy thật không sự cố nghiêm trọng; tắt n8n vẫn live bình thường; không có vi phạm chính sách.

## Bên bạn cần chuẩn bị

- Ứng dụng Meta for Developers (duyệt quyền live & bình luận) + dự án Google Cloud (YouTube Data API).
- Tài khoản TikTok Shop / Shopee đủ điều kiện LIVE; người dẫn thật cho phiên Hybrid.
- 1 VPS làm relay + máy GPU NVIDIA ~24GB (hoặc thuê GPU) cho AI Host.
- Hợp đồng nhà cung cấp giọng Việt dùng thương mại.

## Không làm

Tài khoản ảo tự bình luận, bình luận giả / seeding, tăng mắt xem ảo, proxy / đổi IP / giả thiết bị để né kiểm duyệt, nhân bản giọng hoặc khuôn mặt khi chưa có đồng ý.
