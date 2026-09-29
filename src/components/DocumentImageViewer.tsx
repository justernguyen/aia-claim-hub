import React, { useState, useEffect } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  FileText,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { DocumentItem } from '../types/claim';

interface DocumentImageViewerProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentImageViewer: React.FC<DocumentImageViewerProps> = ({
  document,
  isOpen,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotation(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !document) return null;

  const imageUrl = document.fileUrl || document.previewUrl;

  const handleZoomIn = () => setZoom((prev) => Math.min(3, prev + 0.25));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.25));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = window.document.createElement('a');
    a.href = imageUrl;
    a.download = document.fileName || `${document.name}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-60 overflow-hidden bg-slate-950/90 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 text-white flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-aia-red rounded-xl text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight">{document.name}</h3>
              {document.status === 'verified' && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Đã đối soát hợp lệ</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
              <span>Kích thước: {document.fileSize || 'Ảnh chụp y tế'}</span>
              {document.updatedAt && (
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" />
                  {document.updatedAt}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {imageUrl && (
            <>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Phóng to"
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                title="Thu nhỏ"
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleRotate}
                title="Xoay 90 độ"
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <RotateCw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                title="Tải ảnh về máy"
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-slate-800 mx-1" />
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Preview Workspace */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-6 select-none">
        {imageUrl ? (
          <div
            className="transition-transform duration-200 ease-out origin-center max-w-4xl"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
            }}
          >
            <img
              src={imageUrl}
              alt={document.name}
              className="max-h-[80vh] w-auto rounded-xl shadow-2xl object-contain border border-slate-700 bg-white"
            />
          </div>
        ) : (
          <div className="text-center text-slate-400 py-16 space-y-3">
            <FileText className="w-16 h-16 mx-auto text-slate-600" />
            <p className="text-base font-bold text-slate-300">Chưa có ảnh chứng từ được đính kèm</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hồ sơ này chỉ có thông tin kiểm mục. Bạn có thể bấm &ldquo;Đính kèm ảnh&rdquo; ở màn hình trước để tải ảnh giấy tờ bệnh viện vào đây lưu trữ lâu dài.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Footer Info */}
      <div className="py-2.5 px-6 bg-slate-900/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Lưu trữ nội bộ an toàn • Không sợ hết hạn như Zalo</span>
        <span>Phím tắt: ESC để đóng • Lăn chuột hoặc bấm icon để phóng to soi số liệu</span>
      </div>
    </div>
  );
};
