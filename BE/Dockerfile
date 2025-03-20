FROM openjdk:21
EXPOSE 8080
ADD /target/project-0.0.19-SNAPSHOT.jar baby-tracking-app.jar
ENTRYPOINT ["java", "-jar", "baby-tracking-app.jar"]