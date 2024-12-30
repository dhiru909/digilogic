import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { config } from '../config/config'
import { v4 as uuidv4 } from 'uuid'
import { AppError } from '../middleware/errorHandler'
const s3 = new S3Client({
    region: config.s3Region,
    credentials: {
        accessKeyId: config.s3AccessKey!,
        secretAccessKey: config.s3SecretAccessKey!,
    },
})

const uploadToS3 = async (fileType: string, file: Express.Multer.File) => {
    // Upload image to storage
    // const imageUrl = await uploadToStorage(resumeFile);

    const fileName = `${uuidv4()}-${file.originalname}`
    const uploadParams = {
        Bucket: config.s3bucket, // The name of your S3 bucket
        Key: fileType + '/' + fileName, // The key (path in S3)
        Body: file.buffer, // The file content
    }
    const putObjectCommand = new PutObjectCommand(uploadParams)
    const response = await s3.send(putObjectCommand)
    if(response.ETag){
        return `https://${config.s3bucket}.s3.${config.s3Region}.amazonaws.com/${fileType}/${fileName}`
    }else{
        throw new AppError(400,'Error uploading Image')
    }

    // console.dir(response, { depth: null })
    // return `https://${config.s3bucket}.s3.${config.s3Region}.amazonaws.com/${fileType}/${fileName}`
    
}

export { uploadToS3 }
