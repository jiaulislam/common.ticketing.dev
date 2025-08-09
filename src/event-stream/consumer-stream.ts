import { Consumer, ConsumerGlobalAndTopicConfig, EachMessagePayload } from "@confluentinc/kafka-javascript/types/kafkajs";

const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS;


export abstract class BaseConsumer {
    protected kafka: typeof Kafka;
    protected consumer: Consumer;

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

        this.consumer = this.kafka.consumer();
    }

    async connect() {
        await this.consumer.connect();
    }

    async disconnect() {
        await this.consumer.disconnect();
    }

    async consume(topic: string, config: ConsumerGlobalAndTopicConfig) {
        // setup graceful shutdown
        const disconnect = () => {
            consumer.commitOffsets().finally(() => {
                consumer.disconnect();
            });
        };
        process.on("SIGTERM", disconnect);
        process.on("SIGINT", disconnect);

        // set the consumer's group ID, offset and initialize it
        config["group.id"] = "nodejs-group-1";
        config["auto.offset.reset"] = "earliest";
        const consumer = new Kafka().consumer(config);

        // connect the consumer to the broker
        await consumer.connect();

        // subscribe to the topic
        await consumer.subscribe({ topics: [topic] });

        // consume messages from the topic
        consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                console.log(
                    `Consumed message from topic ${topic}, partition ${partition}: key = ${message.key?.toString()}, value = ${message.value?.toString()}`
                );
            },
        });
    }
}
