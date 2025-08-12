import { Consumer, ConsumerGlobalAndTopicConfig, EachMessagePayload } from "@confluentinc/kafka-javascript/types/kafkajs";
import { Subject } from "../events";
const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS;



export abstract class AbstractKafkaConsumer {
    private kafka: typeof Kafka;
    private consumer: Consumer;
    protected topics: Subject[];
    abstract readonly clusterName: string;

    constructor(config: ConsumerGlobalAndTopicConfig, topics: Subject[]) {
        config["auto.offset.reset"] = "earliest";
        if (!config['group.id']) {
            throw new Error("Missing groupId in consumer config");
        }
        this.kafka = new Kafka(config);
        this.consumer = this.kafka.consumer(config);
        this.topics = topics;
    }

    async connect() {
        await this.consumer.connect();
    }

    async disconnect() {
        await this.consumer.disconnect();
    }

    getClusterName(): string | null {
        return this.clusterName ?? null;
    }

    getConsumer(): Consumer {
        return this.consumer;
    }

    async consume() {
        await this.consumer.subscribe({ topics: this.topics });

        this.consumer.run({
            eachMessage: async ({ topic, message }: EachMessagePayload): Promise<void> => {
                console.log(`Received message: ${message.value?.toString()}`);
                const parsed = JSON.parse(message.value?.toString() || '{}');
                this.onMessage(topic, parsed);
            },
        });
    }

    abstract onMessage(topic: string, message: any): void;
}
