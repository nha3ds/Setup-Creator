
function createDockerfileContentSpringBoot() {
    return `FROM openjdk:8-jdk-alpine
ARG env_name
RUN apk add tzdata
ENV TZ=Asia/Riyadh
ARG JAR_FILE=target/*.jar
RUN mkdir opt/wallet
COPY ./wallet/* opt/wallet/
COPY \${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","app.jar"]`
}

function createDockerfileContentWildFly() {
    return `FROM jboss/wildfly:10.0.0.Final
ARG env_name
USER root
RUN mkdir /opt/jboss/wildfly/modules/system/layers/base/com/oracle
RUN mkdir /opt/jboss/wildfly/modules/system/layers/base/com/oracle/driver
RUN mkdir /opt/jboss/wildfly/modules/system/layers/base/com/oracle/driver/main
RUN mkdir /opt/wallet
COPY wallet/* /opt/wallet/
COPY wildfly-modules/oracle-driver/* /opt/jboss/wildfly/modules/system/layers/base/com/oracle/driver/main/
COPY wildfly-configuration/$env_name/standalone.xml /opt/jboss/wildfly/standalone/configuration/
COPY target/*.war /opt/jboss/wildfly/standalone/deployments/
EXPOSE 8080`
}

exports.createDockerfileContentSpringBoot = createDockerfileContentSpringBoot;
exports.createDockerfileContentWildFly = createDockerfileContentWildFly;