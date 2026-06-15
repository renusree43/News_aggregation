# Stage 1: Build the application using Maven
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the jar package
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime container
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/coreservices-0.0.1-SNAPSHOT.jar app.jar

# Define port 8001 (Render will override this, but we configure it as a default)
ENV PORT=8001
EXPOSE 8001

# Run the jar with the dynamically injected port
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT}"]
