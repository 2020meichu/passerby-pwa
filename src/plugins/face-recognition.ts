import * as faceapi from 'face-api.js'
import * as canvas from 'canvas'

class FaceRecognition {
  faceDetectionOptions: any
  faceDetectionNet: any

  constructor () {
    this.faceDetectionNet = faceapi.nets.ssdMobilenetv1
    // SsdMobilenetv1Options
    const minConfidence = 0.5
    // TinyFaceDetectorOptions
    const inputSize = 408
    const scoreThreshold = 0.5

    function getFaceDetectorOptions (net: faceapi.NeuralNetwork<any>) {
      return net === faceapi.nets.ssdMobilenetv1
        ? new faceapi.SsdMobilenetv1Options({ minConfidence })
        : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
    }

    this.faceDetectionOptions = getFaceDetectorOptions(this.faceDetectionNet)
    // Pre-load the weights of model
    this.faceDetectionNet.loadFromUri('/weights')
  }

  async getFaceImageDataURL (imagePath: string, size: number): Promise<string> {
    const image = await canvas.loadImage(imagePath)
    console.log(image)

    const detections = await faceapi.detectAllFaces(image as any, this.faceDetectionOptions)

    if (detections.length > 1) {
      throw '在這張圖片中檢測到多張臉，請重新拍照試試'
    } else if (detections.length === 0) {
      throw '在這張圖片中沒有檢測到任何一張臉，請重新拍照試試'
    }

    const box: faceapi.Box = detections[0].box

    return new Promise((resolve: Function, reject: Function): any => {
      const canvasFace = canvas.createCanvas(size, size)
      const faceImage = new Image()
      faceImage.src = imagePath
      faceImage.onload = function (): void {
        const ctx = canvasFace.getContext('2d')
        const ratio = size / box.width
        ctx.drawImage(faceImage, box.x - 100, box.y - 100, box.width + 200, box.height + 200, 0, (size - box.height * ratio) / 2, size, box.height * ratio)
        resolve(canvasFace.toDataURL('image/jpeg'))
      }
    })
  }
}

export default new FaceRecognition()
