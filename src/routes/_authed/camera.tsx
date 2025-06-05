import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/camera")({
  component: RouteComponent,
});

function RouteComponent() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
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

  async function submitImage(imageDataUrl: string) {
    // TODO: replace with actual API endpoint
    try {
      await fetch("https://example.com/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl }),
      });
    } catch (err) {
      console.error("Failed to submit image", err);
    }
  }

  const takeStill = React.useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    toast("Image captured!");
    submitImage(dataUrl);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4">Camera Access</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded shadow-lg w-full aspect-video bg-black"
        style={{ display: hasPermission ? "block" : "none" }}
      />
      <canvas ref={canvasRef} className="hidden" />
      {!hasPermission && !error && (
        <div className="text-gray-500">Requesting camera access...</div>
      )}
      {hasPermission && (
        <Button className="mt-4" onClick={takeStill}>
          Take Still
        </Button>
      )}
    </div>
  );
}
