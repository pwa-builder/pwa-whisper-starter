let whisperWorker: Worker;

// @ts-ignore
import WhisperWorker from './ai-worker?worker'

export async function loadTranscriber(model: "tiny" | "base"): Promise<void> {
    return new Promise((resolve) => {
        whisperWorker = new WhisperWorker();

        whisperWorker.onmessage = async (e) => {
            if (e.data.type === "loaded") {
                resolve();
            }
        };

        whisperWorker.postMessage({
            type: "load",
            model: model || "tiny",
        });
    });
}

export function doLocalWhisper(audioFile: Blob, model: "tiny" | "small" | "base"): Promise<any> {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
            const audioCTX = new AudioContext({
                sampleRate: 16000,
            });
            const arrayBuffer = fileReader.result as ArrayBuffer;
            const audioData = await audioCTX.decodeAudioData(arrayBuffer);

            let audio = audioData.getChannelData(0);

            whisperWorker.onmessage = async (e) => {
                if (e.data.type === "transcribe") {
                    resolve(e.data);
                }
                else if (e.data.type === "transcribe-interim") {
                    window.dispatchEvent(new CustomEvent('interim-transcription', {
                        detail: {
                            message: e.data.transcription,
                        }
                    }));
                }
            }

            whisperWorker.postMessage({
                type: "transcribe",
                blob: audio,
                model: model || "tiny",
            })

        };
        fileReader.readAsArrayBuffer(audioFile);
    })
}