export default function AlbumBackdrop({ backdrop, title }) {
    return (
        <div className="relative w-full">

            {backdrop && (
                <>
                    <img
                        src={backdrop}
                        alt={title}
                        draggable={false}
                        className="w-full lg:h-[450px] h-[440px] select-none pointer-events-none object-cover object-center"
                        style={{
                            filter: "brightness(0.55) saturate(1.05)",
                            maskImage:
                                "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.3) 80%, transparent 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.3) 80%, transparent 100%)",
                        }}
                    />

                    <div
                        className="absolute inset-y-0 left-0 pointer-events-none"
                        style={{
                            width: "18%",
                            background:
                                "linear-gradient(to right, var(--bg, #0a0a0a) 0%, transparent 100%)",
                        }}
                    />

                    <div
                        className="absolute inset-y-0 right-0 pointer-events-none"
                        style={{
                            width: "18%",
                            background:
                                "linear-gradient(to left, var(--bg, #0a0a0a) 0%, transparent 100%)",
                        }}
                    />

                    <div
                        className="absolute inset-x-0 top-0 pointer-events-none"
                        style={{
                            height: "15%",
                            background:
                                "linear-gradient(to bottom, var(--bg, #0a0a0a) 0%, transparent 100%)",
                        }}
                    />
                </>
            )}
        </div>
    );
}