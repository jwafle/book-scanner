import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/_authed/camera")({
  component: RouteComponent,
});

function RouteComponent() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [hasPermission, setHasPermission] = React.useState(false);

  React.useEffect(() => {
    async function getCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
          },
        });
        setHasPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        setError("Camera access denied or unavailable.");
      }
    }
    getCamera();
    // Cleanup: stop the camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Camera Access</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded shadow-lg w-full aspect-video bg-black"
        style={{ display: hasPermission ? "block" : "none" }}
      />
      {!hasPermission && !error && (
        <div className="text-gray-500">Requesting camera access...</div>
      )}
    </div>
  );
}
