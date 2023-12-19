"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import Timer from "../timer";
import {
  DELETE_ICON,
  MICROPHONE_ICON,
  PAUSE_ICON,
  PLAY_ICON,
} from "../assets/SVG/Icons";
import { secondsToHMS } from "@/lib/secondsToHMS";
import { Slider } from "../ui/slider";

const mimeType = "audio/webm";
const VoiceRecorder = ({
  mediaRecorder,
}: {
  mediaRecorder: MutableRefObject<MediaRecorder | null>;
}) => {
  // console.log(props.mediaRef);
  const [permission, setPermission] = useState(false);
  // const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioPlay = useRef<HTMLAudioElement | null>(null);
  const [audioStatus, setAudioStatus] = useState<"palying" | "stopped">(
    "stopped"
  );
  const [currentPlayBackTime, setCurrentPlayBackTime] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState<
    "inactive" | "recording"
  >("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = useState<any[]>([]);
  const [audio, setAudio] = useState<string | null>(null);
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        // console.log("enter");
        // console.log(streamData);
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert("دسترسی داده نشد.");
      }
    } else {
      alert("امکان ضبط صد در مرورگر شما وجود ندارد.");
    }
  };
  useEffect(() => {
    if (audioStatus === "stopped") {
      audioPlay.current?.duration;
      return;
    }
    const interval = setInterval(() => {
      setCurrentPlayBackTime(audioPlay.current?.currentTime || 0);
    });
    return () => clearInterval(interval);
  }, [audioStatus]);
  const startRecording = async () => {
    // console.log("clieck");
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    if (!stream) return;
    const media = new MediaRecorder(stream, { mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks: any[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    //stops the recording instance
    if (!mediaRecorder.current) return;
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setRecordingStatus("inactive");
      setAudioChunks([]);
      // const tracks = stream?.getTracks();
      // tracks?.forEach((track) => {
      //   track.stop();
      // });
      // setStream(null);
      // setPermission(false);
      // mediaRecorder.current = null;
    };
    mediaRecorder.current?.stop();
  };
  return (
    <div className="rounded-sm bg-primary-gray px-4 py-2 text-[12px] font-light text-[rgba(17,71,55,1)]">
      <div className="h-full w-full">
        {!permission ? (
          <button
            className="h-full w-full flex items-center gap-2"
            onClick={getMicrophonePermission}
            type="button"
          >
            <span className="rounded-full overflow-hidden bg-[rgba(189,239,224,1)] flex items-center justify-center">
              <MICROPHONE_ICON
                className="m-2"
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </span>
            <span>ضبط صدا</span>
          </button>
        ) : null}
        {permission && recordingStatus === "inactive" && !audio ? (
          <button
            className="h-full w-full flex items-center gap-2"
            onClick={startRecording}
            type="button"
          >
            <span className="rounded-full overflow-hidden bg-[rgba(189,239,224,1)] flex items-center justify-center">
              <MICROPHONE_ICON
                className="m-2"
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </span>
            <span>شروع ضبط</span>
          </button>
        ) : null}
        {recordingStatus === "recording" ? (
          <button
            className="h-full w-full flex items-center gap-2"
            onClick={stopRecording}
            type="button"
          >
            <span className="rounded-full overflow-hidden bg-[rgba(189,239,224,1)] flex items-center justify-center border border-[rgba(17,71,55,1)] transition-[border] animate-pulse">
              <MICROPHONE_ICON
                className="m-2"
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </span>
            <Timer type="asc" />
          </button>
        ) : null}
      </div>
      {audio ? (
        <div className="flex items-center justify-between gap-2">
          {audioStatus === "stopped" ? (
            <span
              onClick={() => {
                audioPlay.current?.play();
                if (!audioPlay.current) return;
                audioPlay.current.onended = () => {
                  setAudioStatus("stopped");
                };
                setAudioStatus("palying");
              }}
              className="rounded-full overflow-hidden bg-[rgba(189,239,224,1)] flex items-center justify-center cursor-pointer"
            >
              <PLAY_ICON
                className="m-2"
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </span>
          ) : (
            <span
              onClick={() => {
                audioPlay.current?.pause();
                setAudioStatus("stopped");
              }}
              className="rounded-full overflow-hidden bg-[rgba(189,239,224,1)] flex items-center justify-center cursor-pointer"
            >
              <PAUSE_ICON
                className="m-2"
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </span>
          )}
          <span>
            {audioStatus === "stopped" ? (
              <span>
                {secondsToHMS(
                  !Number.isNaN(audioPlay.current?.duration) &&
                    audioPlay.current?.duration !== Infinity
                    ? audioPlay.current?.duration || 0
                    : 0
                )}
              </span>
            ) : (
              <span className="flex flex-col items-stretch gap-1 leading-none">
                <span>
                  <Slider
                    onValueChange={(e) => {
                      if (!audioPlay?.current?.currentTime) return;
                      audioPlay.current.currentTime = e[0];
                      setCurrentPlayBackTime(e[0] as number);
                    }}
                    defaultValue={[0]}
                    value={[currentPlayBackTime]}
                    max={
                      !Number.isNaN(audioPlay.current?.duration) &&
                      audioPlay.current?.duration !== Infinity
                        ? audioPlay.current?.duration || 0
                        : 0
                    }
                    step={1}
                  />
                </span>
                <span className="text-[12px] text-[rgba(17,71,55,1)] font-light">
                  {secondsToHMS(currentPlayBackTime)}
                </span>
              </span>
            )}
          </span>
          <span className={`${audioStatus === "palying" && "hidden"}`}>
            <span
              onClick={(e) => {
                e.preventDefault();
                setAudio(null);
                setAudioChunks([]);
              }}
              className="rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
            >
              <DELETE_ICON
                className=""
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </span>
          </span>
          <audio
            ref={audioPlay}
            src={audio}
            controls
            className="hidden"
          ></audio>
        </div>
      ) : null}
    </div>
  );
};

export default VoiceRecorder;
