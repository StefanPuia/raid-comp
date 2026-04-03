FROM amazoncorretto:25-alpine-jdk

WORKDIR /app

COPY . .
RUN ./gradlew compileJava

CMD ["/app/gradlew", "bootRun"]
