import { Kafka, KafkaConfig, Consumer, EachMessagePayload, ConsumerConfig } from "kafkajs";
import { Subject } from "../events";



export abstract class AbstractKafkaConsumer {
    private kafka: Kafka;
    public consumer: Consumer;
    protected topics: Subject[];
    /**
     * The name of the Kafka cluster this consumer connects to.
     * Must be implemented by subclasses.
     */
    abstract readonly clusterName: string;

    constructor(config: KafkaConfig, topics: Subject[]) {
        this.kafka = new Kafka(config);
        this.topics = topics;
        this.consumer = this.kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID! });
    }

    async connect() {
        await this.consumer.connect();
        console.log(`✅ Consumer connected to cluster: ${this.clusterName}`);
    }

    async disconnect() {
        await this.consumer.disconnect();
        console.log(`✅ Consumer disconnected from cluster: ${this.clusterName}`);
    }

    getClusterName(): string | null {
        return this.clusterName ?? null;
    }

    getConsumer(): Consumer {
        return this.consumer;
    }

    async subscribe() {
        await this.consumer.subscribe({ topics: this.topics, fromBeginning: true });
        console.log(`Subscribed to topics: ${this.topics.join(', ')}`);

    }

    async consume() {
        this.consumer.run({
            eachMessage: async ({ topic, message }: EachMessagePayload): Promise<void> => {
                console.log(`Received message with topic:${topic}: ${message.value?.toString()}`);
                const parsed = JSON.parse(message.value?.toString() || '{}');
                this.onMessage(topic, parsed);
            },
        });
    }

    /**
     * Handler for processing each message received from Kafka.
     * Must be implemented by subclasses.
     * @param topic - The topic from which the message was received.
     * @param message - The parsed message payload.
     */
    abstract onMessage(topic: string, message: any): void;
}
