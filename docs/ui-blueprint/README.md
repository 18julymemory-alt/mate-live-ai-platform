# MateLive UI Blueprint v3

Bộ giao diện dựng bằng HTML/CSS thật (thay cho bản v2 là ảnh AI), xuất ra:

- `MateLive_UI_Blueprint_v3.pdf` — 20 trang: bìa, đánh giá v2, 17 màn hình ứng dụng (mỗi trang có dải ghi chú thiết kế ở dưới), lộ trình code.
- `screens/*.png` — từng màn hình 1920×1080, không có dải ghi chú.

## Cấu trúc

```
src/blueprint.css      design system dùng chung (màu, chữ, thẻ, bảng, nút…)
src/shell.js           sidebar + topbar dùng chung, dải ghi chú PDF, icon nền tảng
src/screens/NN-*.html  mỗi file là một trang
assets/img/            ảnh người mẫu, sản phẩm, nền cắt từ bản v2
scripts/               tách ảnh từ PDF v2 và cắt ảnh
render.mjs             xuất PNG + PDF bằng Playwright
```

## Chạy lại

```bash
cd docs/ui-blueprint
npm install
node render.mjs              # xuất toàn bộ PNG + PDF
node render.mjs --only 05,14 # chỉ xuất PNG vài màn khi đang chỉnh
```

Cắt lại ảnh từ bản v2 (chỉ cần khi đổi vùng cắt trong `scripts/crops.json`):

```bash
python3 scripts/extract_v2_pages.py   # tách 9 trang của PDF v2 vào .v2-pages/
node scripts/crop-assets.mjs
```

Thêm một màn: tạo `src/screens/NN-ten.html`, bọc nội dung trong `<main id="content" class="content">`, khai báo `window.SCREEN = { active, spec }` rồi nạp `lucide.min.js` và `shell.js` như các màn khác.
