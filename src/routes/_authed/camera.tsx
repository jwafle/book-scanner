import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { X } from "lucide-react";

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

  React.useEffect(() => {
    async function getCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
          },
        });
        streamRef.current = stream;
        setHasPermission(true);
        setIsFullScreen(true); // Auto-enter full screen on camera access
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
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
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

  return isFullScreen && hasPermission ? (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center h-screen w-screen">
      <Toaster
        position="top-center"
        toastOptions={{
          className: "rounded-md bg-white shadow-lg border border-gray-300",
        }}
      />
      <Button 
        onClick={() => {
          // Just change the view state without affecting the stream
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
          <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-12a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM12 15a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
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
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        onLoadedMetadata={() => ensureVideoStream()}
        className="rounded shadow-lg w-full aspect-video bg-black"
        style={{ display: hasPermission ? "block" : "none" }}
      />
      <canvas ref={canvasRef} className="hidden" />
      {!hasPermission && !error && (
        <div className="text-gray-500">Requesting camera access...</div>
      )}
      {hasPermission && !isFullScreen && (
        <div className="flex flex-col gap-4 mt-4 items-center">
          <Button 
            onClick={() => {
              ensureVideoStream();
              setIsFullScreen(true);
            }} 
            size="lg" 
            className="px-8 py-6 text-lg"
          >
            Enter Full Screen
          </Button>
          <Button onClick={takeStill} variant="outline">
            Take Still
          </Button>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
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
    </div>
  );
}
