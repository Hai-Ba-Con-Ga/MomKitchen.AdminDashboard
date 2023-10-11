import {
  PutObjectCommand,
  PutObjectRequest,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const config: S3ClientConfig = {
  credentials: {
    accessKeyId: "AKIAWPKX6GSPLAZFCWG5",
    secretAccessKey: "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",
  },
  region: "ap-southeast-1",
};
type UploadParams = {
  object: Blob | File;
  path: string;
};

const useAwsS3 = () => {
  /**
   * ISSUE with s3 client : build version @aws-sdk/client-s3@3.427.0
   * https://stackoverflow.com/questions/77229817/failed-to-fetch-aws
   * https://github.com/aws/aws-sdk-js-v3/issues/5334
   * downgrade to @aws-sdk/client-s3@3.317.0 for working
   * */
  const s3Client = useMemo(() => new S3Client(config), []);
  const putObject = async ({ object, path }: UploadParams) => {
    try {
      const fileName = object instanceof File ? object.name : uuidv4();
      const input: PutObjectRequest = {
        Bucket: "momkitchen",
        Key: path + fileName,
        Body: object,
      };
      const command = new PutObjectCommand(input);
      await s3Client.send(command);
      // const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      // return url
      const objectPath = `https://momkitchen.s3.amazonaws.com/${input.Key}`;
      return objectPath;
    } catch (error) {
      console.error("Error s3 upload => ", error);
      return null;
    }
  };
  return { putObject };
};

export default useAwsS3;
