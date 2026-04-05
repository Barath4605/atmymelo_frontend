export default function AlbumBackdrop({ backdrop, title }) {
    return (
        <div className="absolute inset-x-0 top-0 w-full pointer-events-none z-0">
            {backdrop && (
                <img
                    src={backdrop}
                    alt={title}
                    draggable={false}
                    className="w-full h-[520px] select-none object-cover object-center"
                    style={{
                        filter: "brightness(0.45) saturate(1.1)",
                        maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.2) 80%, transparent 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.2) 80%, transparent 100%)",
                        WebkitUserDrag: "none",
                    }}
                />
            )}
        </div>
    );
}