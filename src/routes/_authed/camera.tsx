import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { X, Camera } from "lucide-react";

export const Route = createFileRoute("/_authed/camera")({
  component: RouteComponent,
});

function RouteComponent() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const stopCameraStream = React.useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setHasPermission(false);
  }, []);

  const startCamera = React.useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          // @ts-ignore - Some browsers support this constraint
          focusMode: { ideal: "continuous" }
        },
      });
      streamRef.current = stream;
      setHasPermission(true);
      setIsFullScreen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      setError("Camera access denied or unavailable.");
      setIsFullScreen(false);
    }
  }, []);

  React.useEffect(() => {
    startCamera();
    // Cleanup: stop the camera when component unmounts
    return () => {
      stopCameraStream();
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

  function handleSubmit() {
    if (capturedImage) {
      submitImage(capturedImage);
    }
    setDialogOpen(false);
    setCapturedImage(null);
  }

  function handleDiscard() {
    setDialogOpen(false);
    setCapturedImage(null);
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
    setCapturedImage(dataUrl);
    toast.custom((t) => (
      <div className="flex items-center w-full rounded-md">
        <img
          src={dataUrl}
          alt="preview"
          className="w-12 h-12 object-cover rounded-md my-2 ml-2 mr-4"
        />
        <span className="text-sm mr-10">Image captured!</span>
        <div className="ml-auto mr-2 rounded-md">
          <Button
            size="sm"
            onClick={() => {
              setDialogOpen(true);
              toast.dismiss(t);
            }}
          >
            Inspect
          </Button>
        </div>
      </div>
    ));
  }, []);

  // Helper function to ensure video element has the stream assigned
  const ensureVideoStream = React.useCallback(() => {
    if (videoRef.current && streamRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, []);

  // Ensure video stream is connected after render
  React.useEffect(() => {
    ensureVideoStream();
  });

  return (
    <>
      {isFullScreen && hasPermission ? (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center h-screen w-screen">
          <Toaster
            position="top-center"
            toastOptions={{
              className: "rounded-md bg-white shadow-lg border border-gray-300",
            }}
          />
          <Button 
            onClick={() => {
              stopCameraStream();
              setIsFullScreen(false);
            }}
            className="absolute top-4 right-4 z-10 rounded-full w-10 h-10 p-0"
            variant="outline"
          >
            <X className="h-5 w-5" />
          </Button>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onLoadedMetadata={() => ensureVideoStream()}
            className="w-full h-full object-cover absolute inset-0"
          />
          <canvas ref={canvasRef} className="hidden" />
          <Button 
            onClick={takeStill}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 px-8 py-6 text-lg rounded-full h-16 w-16 bg-white text-black hover:bg-gray-200"
          >
            <Camera className="w-8 h-8" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Toaster
            position="top-center"
            toastOptions={{
              className: "rounded-md bg-white shadow-lg border border-gray-300",
            }}
          />
          <h1 className="text-2xl font-bold mb-4">Camera Access</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {!hasPermission && !error && !isFullScreen && (
            <div className="flex flex-col gap-4 items-center">
              <Camera className="w-16 h-16 text-gray-400 mb-2" />
              <Button 
                onClick={() => {
                  setError(null);
                  startCamera();
                }} 
                size="lg" 
                className="px-8 py-6 text-lg"
              >
                Open Camera
              </Button>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onLoadedMetadata={() => ensureVideoStream()}
            className="hidden"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="z-[60]">
          {capturedImage && (
            <img
              src={capturedImage}
              alt="captured"
              className="w-full h-auto my-4 rounded-md"
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleDiscard}>
              Discard
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
