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

  classify(htmlImageElement: HTMLImageElement): Promise<Uint8Array | Int32Array | Float32Array> {
    return this.loadModelTf().then(r => {
      const tensor = tf.browser.fromPixels(htmlImageElement).resizeNearestNeighbor([150, 150]).toInt().expandDims();
      console.log('tensor');
      console.log(tensor);

      tensor.reshape([-1, 150, 150, 3]);
      const prediction = r.predict(tensor) as tf.Tensor<tf.Rank>;
      console.log('prediction');
      console.log(prediction);
      prediction.data().then(p => {
        console.log(p);
      });
      return prediction.data();
      }
    );
  }

  convert(result: Float32Array): string {
    const length = result.length;
    console.log(length);
    const rank = this.find(result);
    console.log(rank);
    if (rank === 0)
    {
      return 'first';
    }
    if (rank === 1)
    {
      return 'second';
    }
    if (rank === 2)
    {
      return 'Гондола';
    }
    if (rank === 3)
    {
      return 'fourth';
    }
    if (rank === 4)
    {
      return 'Круизный лайнер';
    }
    if (rank === 5)
    {
      return 'sixth';
    }
    if (rank === 6)
    {
      return 'seventh';
    }
    if (rank === 7)
    {
      return 'eighth';
    }
    if (rank === 8)
    {
      return 'Парусник';
    }
  }

  find(arr: Float32Array): number {
      if (arr.length === 0) {
        return -1;
      }

      let max = arr[0];
      let maxIndex = 0;

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
        }
      }
      return maxIndex;
  }
}
