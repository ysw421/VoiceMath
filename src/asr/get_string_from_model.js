import { client } from "@gradio/client";

export async function sendAudioToModel(file) {

  const app = await client("http://127.0.0.1:7860/");
  const result = await app.predict("/predict", [
          "hlloe", 	// blob in 'audio' Audio component
    ]);
  console.log(result.data);
}

