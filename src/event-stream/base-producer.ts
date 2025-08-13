import { Kafka, Producer, KafkaConfig } from "kafkajs";

import { Subject } from "../events";


/**
 * Abstract class that represents a Kafka producer.
 * Provides common functionality for sending messages to a Kafka cluster.
 */
export abstract class AbstractKafkaProducer {
    private kafka: Kafka;
    private producer: Producer;

    /**
     * The name of the Kafka cluster this producer connects to.
     * Must be implemented by subclasses.
     */
    abstract readonly clusterName: string;

    constructor(config: KafkaConfig) {
        this.kafka = new Kafka(config);
        this.producer = this.kafka.producer();
    }

    /**
     * Connects the producer to the Kafka cluster.
     */
    async connect() {
        await this.producer.connect();
        console.log(`✅ Producer connected to cluster: ${this.clusterName}`);
    }

    /**
     * Disconnects the producer from the Kafka cluster.
     */
    async disconnect() {
        await this.producer.disconnect();
        console.log(`✅ Producer disconnected from cluster: ${this.clusterName}`);
    }

    /**
     * Returns the cluster name.
     * @returns The cluster name or null if not set.
     */
    getClusterName(): string | null {
        return this.clusterName ?? null;
    }

    /**
     * Returns the producer instance.
     * @returns The producer.
     */
    getProducer(): Producer {
        return this.producer;
    }

}

/**
 * Abstract class that represents a Kafka event producer.
 * Provides functionality for publishing events to a Kafka topic.
 */
export abstract class AbstractKafkaEventProducer<T> {
    protected producer: Producer;

    /**
     * The Kafka topic to which events will be published.
     * Must be implemented by subclasses.
     */
    abstract readonly topic: Subject;

    constructor(producer: AbstractKafkaProducer) {
        this.producer = producer.getProducer();
    }

    /**
     * Publishes an event to the Kafka topic.
     * @param value - The event data to be published.
     */
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
