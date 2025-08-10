import { Consumer, ConsumerGlobalAndTopicConfig, EachMessagePayload } from "@confluentinc/kafka-javascript/types/kafkajs";

const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS;


export abstract class BaseConsumer<T> {
    protected kafka: typeof Kafka;
    protected consumer: Consumer;
    protected topic: string;

    constructor(config: ConsumerGlobalAndTopicConfig, topic: string) {
        this.kafka = new Kafka({
            "bootstrap.servers": process.env.KAFKA_BOOTSTRAP_SERVERS!,
            "security.protocol": process.env.KAFKA_SASL_PROTOCOL!,
            "sasl.mechanism": process.env.KAFKA_SASL_MECHANISM!,
            "sasl.username": process.env.KAFKA_SASL_USERNAME!,
            "sasl.password": process.env.KAFKA_SASL_PASSWORD!,
            "socket.timeout.ms": 45000,
            "client.id": process.env.KAFKA_CLIENT_ID!,
        });

        this.consumer = this.kafka.consumer(config);
        this.topic = topic;
    }

    async connect() {
        await this.consumer.connect();
    }

    async disconnect() {
        await this.consumer.disconnect();
    }

    abstract handleMessage(message: T): void;

    async consume() {
        // setup graceful shutdown
        const disconnect = () => {
            this.consumer.commitOffsets().finally(() => {
                this.consumer.disconnect();
            });
        };
        process.on("SIGTERM", disconnect);
        process.on("SIGINT", disconnect);

        // connect the consumer to the broker
        await this.consumer.connect();

        // subscribe to the topic
        await this.consumer.subscribe({ topics: [this.topic] });

        // consume messages from the topic
        this.consumer.run({
            eachMessage: async ({ message }: EachMessagePayload): Promise<void> => {
                console.log(`Received message: ${message.value?.toString()}`);
                const parsed = JSON.parse(message.value?.toString() || '{}') as T;
                this.handleMessage(parsed);
            },
        });
    }
}
