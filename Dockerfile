#FROM openjdk:15-jdk-alpine as build
#WORKDIR /workspace/app

#COPY mvnw .
#COPY .mvn .mvn
#COPY pom.xml .
#COPY src src

#RUN chmod 744 mvnw

#RUN ./mvnw install -DskipTests

FROM openjdk:15-jdk-alpine
#VOLUME /tmp
#COPY --from=build /workspace/app/target/*.jar app.jar
COPY target/*.jar app.jar
EXPOSE 5000
ENTRYPOINT java -jar app.jar 
#\--server.port=5000 --spring.datasource.url=$DB_URL --spring.datasource.password=$DB_PASSWORD --spring.datasource.username=$DB_USERNAME