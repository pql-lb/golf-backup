import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: "eu-west-2",
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("fired", body);
        const params = {
            Destination: {
                ToAddresses: ["hello@feedbacktooling.com"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `Input1: ${body.input1}, Input2: ${body.input2}`,
                    },
                },
                Subject: { Data: "New Hero Form Submission" },
            },
            Source: "hello@feedbacktooling.com",
        };

        let sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
            .sendEmail(params)
            .promise();

        return sendPromise
            .then(function (data) {
                return new Response(
                    JSON.stringify({
                        message: "Success",
                        id: data.MessageId,
                    }),
                    {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            })
            .catch(function (err) {
                console.error(err);
                return new Response(
                    JSON.stringify({
                        message: "Error",
                        result: err,
                    }),
                    {
                        status: 500,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(
            JSON.stringify({
                message: "Error",
                result: error,
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
