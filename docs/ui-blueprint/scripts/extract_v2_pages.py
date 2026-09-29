"""Extract the 9 page images of MateLive_Premium_UI_9_Pages_v2.pdf into PNG files.

The v2 PDF (ReportLab) stores each page as one raw RGB image (ASCII85 + Flate),
so it can be decoded with the Python standard library only.

Usage: python3 scripts/extract_v2_pages.py [pdf_path] [out_dir]
"""
import base64
import re
import struct
import sys
import zlib
from pathlib import Path

HERE = Path(__file__).resolve().parent
PDF = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parents[2] / "MateLive_Premium_UI_9_Pages_v2.pdf"
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else HERE.parent / ".v2-pages"


def write_png(path, width, height, rgb):
    stride = width * 3
    rows = b"".join(b"\x00" + rgb[y * stride:(y + 1) * stride] for y in range(height))

    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    header = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    path.write_bytes(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header) + chunk(b"IDAT", zlib.compress(rows, 6)) + chunk(b"IEND", b""))


def main():
    data = PDF.read_bytes()
    objects = {int(n): body for n, body in re.findall(rb"(\d+) 0 obj(.*?)endobj", data, re.S)}
    OUT.mkdir(parents=True, exist_ok=True)
    page_no = 0
    for num in sorted(objects):
        body = objects[num]
        if b"/Subtype /Image" not in body[:400]:
            continue
        width = int(re.search(rb"/Width (\d+)", body).group(1))
        height = int(re.search(rb"/Height (\d+)", body).group(1))
        start = body.index(b"stream") + len(b"stream")
        end = body.rindex(b"endstream")
        encoded = re.sub(rb"\s", b"", body[start:end])
        if encoded.endswith(b"~>"):
            encoded = encoded[:-2]
        rgb = zlib.decompress(base64.a85decode(encoded))
        page_no += 1
        write_png(OUT / f"page{page_no}.png", width, height, rgb[: width * height * 3])
        print(f"page{page_no}.png {width}x{height}")


if __name__ == "__main__":
    main()
