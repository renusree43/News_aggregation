# Stage 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the jar package
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime container
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/coreservices-0.0.1-SNAPSHOT.jar app.jar

# Ensure H2 database directory exists
RUN mkdir -p /app/data

# Define port 8001 (Render will override this via the PORT environment variable)
ENV PORT=8001
EXPOSE 8001

# Run the jar with JVM memory constraints suited for Render's 512MB RAM free tier
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
