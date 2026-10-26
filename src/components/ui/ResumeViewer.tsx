"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileText, X } from "lucide-react";

const resume = "/images/Resume%202026%20Samuel%20Epodoi.pdf";

export function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || !dialog.current) return;
    const modal = dialog.current;
    const triggerElement = trigger.current;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      triggerElement?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="resume-view-trigger"
        data-reveal
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <FileText size={17} aria-hidden="true" />
        <span>View résumé</span>
        <span className="mono">PDF</span>
      </button>
      <dialog
        ref={dialog}
        className="resume-modal"
        aria-labelledby="resume-modal-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="resume-modal-header">
          <h2 id="resume-modal-title">
            <FileText size={18} aria-hidden="true" />
            Résumé
          </h2>
          <div className="resume-modal-actions">
            <a href={resume} download="Samuel-Epodoi-Resume.pdf">
              <Download size={16} aria-hidden="true" />
              <span>Download</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close résumé"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        {open && (
          <iframe
            src={`${resume}#toolbar=1&navpanes=0&view=FitH`}
            title="Samuel Epodoi résumé PDF viewer"
            className="resume-pdf-frame"
          />
        )}
      </dialog>
    </>
  );
}
