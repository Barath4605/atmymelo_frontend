import SubmitReport from "../SubmitReport.jsx";

export default function AlbumBackdrop({ backdrop, title, albumId }) {
  return (
    <div className="absolute inset-x-0 top-0 w-full z-0">
      {backdrop && (
        <img
          src={backdrop}
          alt={title}
          draggable={false}
          className="w-full relative h-130 select-none object-cover object-center"
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
      <div className={`absolute w-fit right-5 z-20 bottom-20`}>
        <SubmitReport albumId={albumId} type="album" />
      </div>
    </div>
  );
}
