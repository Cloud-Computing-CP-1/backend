import { ReceiveMessageCommand, DeleteMessageCommand, } from "@aws-sdk/client-sqs";
import { sqs } from "../../index.js";
import { Auto_Deploy } from "../../service/Auto.deploy.service.js";
export const startQueueWorker = async () => {
    const queueUrl = process.env.AWS_QUEUE_URI;
    if (!queueUrl) {
        throw new Error("AWS_QUEUE_URI is required");
    }
    while (true) {
        try {
            const { Messages } = await sqs.send(new ReceiveMessageCommand({
                QueueUrl: queueUrl,
                MaxNumberOfMessages: 1,
                WaitTimeSeconds: 20,
                VisibilityTimeout: 300,
            }));
            for (const message of Messages ?? []) {
                try {
                    if (!message.Body || !message.ReceiptHandle) {
                        throw new Error("Invalid SQS message");
                    }
                    const payload = JSON.parse(message.Body);
                    console.log(payload);
                    await Auto_Deploy.Porcess_data_Deploye(payload);
                    await sqs.send(new DeleteMessageCommand({
                        QueueUrl: queueUrl,
                        ReceiptHandle: message.ReceiptHandle,
                    }));
                    console.log("Message processed and deleted");
                }
                catch (error) {
                    console.error("Message processing failed:", error);
                }
            }
        }
        catch (error) {
            console.error("Queue polling failed:", error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};
//# sourceMappingURL=Auto_Deployment.js.map