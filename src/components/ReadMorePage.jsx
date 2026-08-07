import React from 'react';
import { X } from 'lucide-react';

const ReadMore = ({ title, subtitle, bio, customText }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
      <>
        <button
            onClick={() => setOpen(true)}
            className="montserrat-300 uppercase cursor-pointer text-[10px] tracking-widest w-fit pb-px border-b border-white/30 transition-opacity hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.35)" }}
        >
            {customText}
        </button>

        {open && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
                onClick={() => setOpen(false)}
            >
              <div
                  className="relative lg:w-[75%] w-full max-h-[80vh] flex flex-col rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(18,18,18,0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
                  }}
                  onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div
                    className="flex items-start justify-between lg:px-7 px-4 pt-7 pb-5 flex-shrink-0"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex flex-col gap-1">
                    <p
                        className="montserrat-400 uppercase tracking-[0.2em] text-[9px]"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                        {customText}
                    </p>
                    <h2
                        className="montserrat-600 text-white text-xl leading-tight"
                    >
                      {title}
                    </h2>
                    {subtitle && (
                        <p
                            className="montserrat-300 text-sm"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {subtitle}
                        </p>
                    )}
                  </div>

                  <button
                      onClick={() => setOpen(false)}
                      className="ml-4 mt-1 flex-shrink-0 transition-opacity hover:opacity-100"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    <X size={22} className="p-1 cursor-pointer hover:text-red-500" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Scrollable bio */}
                <div className="overflow-y-auto lg:px-7 px-4 py-6">
                  <p
                      className="montserrat-300 text-sm leading-8"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {bio}
                  </p>
                </div>
              </div>
            </div>
        )}
      </>
  );
};

export default ReadMore;