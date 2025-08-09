import { Producer } from "@confluentinc/kafka-javascript/types/kafkajs";

const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS;

import { Subject } from "../events";


export interface ProducerMessage<T> {
    subject: Subject;
    data: T;
}

export abstract class BaseProducer {
    protected kafka: typeof Kafka;
    protected producer: Producer;

    constructor() {
        this.kafka = new Kafka({
            "bootstrap.servers": process.env.KAFKA_BOOTSTRAP_SERVERS!,
            "security.protocol": process.env.KAFKA_SASL_PROTOCOL!,
            "sasl.mechanism": process.env.KAFKA_SASL_MECHANISM!,
            "sasl.username": process.env.KAFKA_SASL_USERNAME!,
            "sasl.password": process.env.KAFKA_SASL_PASSWORD!,
            "socket.timeout.ms": 45000,
            "client.id": process.env.KAFKA_CLIENT_ID!,
        });

        this.producer = this.kafka.producer();
    }

    async connect() {
        await this.producer.connect();
    }

    async disconnect() {
        await this.producer.disconnect();
    }

    async produce<T>(topic: string, value: ProducerMessage<T>) {
        const produceRecord = await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(value) }],
        });
        console.log(
            `\n\n Produced message to topic ${topic}: value = ${JSON.stringify(value)}, ${JSON.stringify(
                produceRecord,
                null,
            )} \n\n`
        );
    }
}
