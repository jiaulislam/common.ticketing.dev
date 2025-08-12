import { Producer, ProducerConstructorConfig } from "@confluentinc/kafka-javascript/types/kafkajs";

const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS;

import { Subject } from "../events";


export abstract class AbstractKafkaProducer {
    private kafka: typeof Kafka;
    private producer: Producer;
    abstract readonly clusterName: string;

    constructor(config: ProducerConstructorConfig) {
        this.kafka = new Kafka(config);
        this.producer = this.kafka.producer();
    }

    async connect() {
        await this.producer.connect();
    }

    async disconnect() {
        await this.producer.disconnect();
    }

    getClusterName(): string | null {
        return this.clusterName ?? null;
    }

    getProducer(): Producer {
        return this.producer;
    }

}

export abstract class AbstractEventProducer<T> {
    protected producer: Producer;
    abstract readonly topic: Subject;

    constructor(producer: Producer) {
        this.producer = producer;
    }

    async publish(value: T) {
        const produceRecord = await this.producer.send({
            topic: this.topic,
            messages: [{ value: JSON.stringify(value) }],
        });
        console.log(
            `\n\n Produced message to topic ${this.topic}: value = ${JSON.stringify(value)}, ${JSON.stringify(
                produceRecord,
                null,
            )} \n\n`
        );
    }
}
