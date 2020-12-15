import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { LayersModel } from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {
  constructor() { }

  async loadModelTf(): Promise<LayersModel> {
    console.log('туть');
    const model = await tf.loadLayersModel('http://127.0.0.1:8080/model.json');
    console.log(model);
    return model;
  }

  classify(htmlImageElement: HTMLImageElement): Promise<Uint8Array | Int32Array | Float32Array> {
    return this.loadModelTf().then(r => {
      const tensor = tf.browser.fromPixels(htmlImageElement).resizeNearestNeighbor([120, 120]).toInt().expandDims();
      const prediction = r.predict(tensor) as tf.Tensor<tf.Rank>;
      return prediction.data();
      }
    );
  }

  convert(result: Float32Array): string {
    const length = result.length;
    const rank = this.find(result);
    if (rank === 0)
    {
      return 'каяк';
    }
    if (rank === 1)
    {
      return 'танкер';
    }
    if (rank === 2)
    {
      return 'паром';
    }
    if (rank === 3)
    {
      return 'буй';
    }
    if (rank === 4)
    {
      return 'надувная лодка';
    }
    if (rank === 5)
    {
      return 'парусник';
    }
    if (rank === 6)
    {
      return 'бумажный кораблик';
    }
    if (rank === 7)
    {
      return 'круизный лайнер';
    }
    if (rank === 8)
    {
      return 'гондола';
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
