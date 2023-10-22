import * as tf from '@tensorflow/tfjs-node';
import type { NextApiRequest, NextApiResponse } from 'next';

let model: tf.LayersModel | null = null;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel('public/static/tensorflow_model');
  }
};

const handlePrediction = async (req: NextApiRequest, res: NextApiResponse) => {
  await loadModel();
  if (model) {
    const inputData = req.body;
    const tensor = tf.tensor(inputData.data);
    const predictions = model.predict(tensor) as tf.Tensor[];
    const predictionData = predictions.map((prediction) => prediction.dataSync());
    res.status(200).json({ predictions: predictionData });
  } else {
    res.status(500).send('Model failed to load');
  }
};

export default handlePrediction;
