import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { LayersModel } from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {
  constructor() { }

  async loadModelTf(): Promise<LayersModel> {
    console.log('Load tensorflow model');
    const model = await tf.loadLayersModel('http://127.0.0.1:4200/api/model.json');
    console.log(model);
    return model;
  }

  classify(htmlImageElement: HTMLImageElement): void {
    this.loadModelTf().then(r => {
      const tensor = tf.browser.fromPixels(htmlImageElement).resizeNearestNeighbor([150, 150]).toInt().expandDims();
      console.log('tensor');
      console.log(tensor);

      tensor.reshape([-1, 150, 150, 3]);
      const prediction = r.predict(tensor) as tf.Tensor<tf.Rank>;
      console.log('prediction');
      prediction.data().then(p => {
        console.log(p);
      });
      }
    );
  }
}
