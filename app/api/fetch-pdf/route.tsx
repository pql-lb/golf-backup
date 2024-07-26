// pages/api/fetch-file.js

import AWS from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("here");
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_S3,
        });

        const params = {
            Bucket: "feedbackgolf",
            Key: "combinepdf.pdf",
        };

        const fileData = await s3.getObject(params).promise();
        const fileBuffer: any = fileData.Body;

        // return new NextResponse(JSON.stringify({ fileBuffer: fileBuffer }), {
        //     status: 200,
        //     headers: {
        //         "Content-Type": "application/octet-stream",
        //         "Content-Disposition": `attachment; filename="${params.Key}"`,
        //     },
        // });
        const headers = new Headers();
        headers.set("Content-Type", "application/octet-stream");
        return new NextResponse(fileBuffer, {
            status: 200,
            statusText: "OK",
            headers,
        });
    } catch (error: any) {
        console.error("Error with payment:", error);
        throw new Error(error.message);
    }
}
