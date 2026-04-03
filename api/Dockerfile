FROM openjdk:25-jdk-slim

WORKDIR /app

COPY . .
RUN ./gradlew compileJava

CMD ["/app/gradlew", "bootRun"]
