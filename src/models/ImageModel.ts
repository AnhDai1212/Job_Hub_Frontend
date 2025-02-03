export class ImageModel {
    imageId: Number;
    imageName: String;
    imageData: String;
    uploadAt: Date;
    constructor(
        imageId: Number,
        imageName: String,
        imageData: String,
        uploadAt: Date) {
        this.imageId = imageId;
        this.imageName = imageName;
        this.imageData = imageData;
        this.uploadAt = uploadAt;
    }
}