
function createPomFileContent(appName) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.3.3.RELEASE</version>
		<relativePath />
	</parent>
	<groupId>com.applicationName</groupId>
	<artifactId>${appName}</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>${appName}</name>
	<description>app desc</description>
	<properties>
		<java.version>1.8</java.version>
		<spring-cloud.version>Hoxton.SR7</spring-cloud.version>
	</properties>

	<profiles>
		<profile>
			<id>test</id>
			<activation>

				<activeByDefault>true</activeByDefault>

				<property>
					<name>test</name>
				</property>
			</activation>
			<properties>
				<activatedSpringProperties>test</activatedSpringProperties>
				<maven.test.skip>true</maven.test.skip>
			</properties>
		</profile>
		<profile>
			<id>production</id>
			<activation>
				<property>
					<name>production</name>
				</property>
			</activation>
			<properties>
				<activatedSpringProperties>production</activatedSpringProperties>
			</properties>
		</profile>
	</profiles>





	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<!-- https://mvnrepository.com/artifact/com.oracle/ojdbc7 -->
		<!-- To install oracle to maven local repository. -->
		<!-- Run as Maven Build, then paste the following command and make sure 
			you have the jar in project-libs directory in your project. -->
		<!-- mvn install:install-file -Dfile=project-libs/ojdbc7-12.1.0.jar -DgroupId=com.oracle 
			-DartifactId=ojdbc7 -Dversion=12.1.0 -Dpackaging=jar -->
		<!-- <dependency> <groupId>com.oracle</groupId> <artifactId>ojdbc7</artifactId> 
			<version>12.1.0</version> </dependency> -->

		<dependency>
			<groupId>com.oracle</groupId>
			<artifactId>ojdbc8</artifactId>
			<version>18.3.0</version>
		</dependency>
		<dependency>
			<groupId>com.oracle</groupId>
			<artifactId>ucp</artifactId>
			<version>18.3.0</version>
		</dependency>
		<dependency>
			<groupId>com.oracle</groupId>
			<artifactId>osdt_cert</artifactId>
			<version>18.3.0</version>
		</dependency>
		<dependency>
			<groupId>com.oracle</groupId>
			<artifactId>osdt_core</artifactId>
			<version>18.3.0</version>
		</dependency>
		<dependency>
			<groupId>com.oracle</groupId>
			<artifactId>oraclepki</artifactId>
			<version>18.3.0</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-jersey</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-config-server</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-tomcat</artifactId>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
			<exclusions>
				<exclusion>
					<groupId>org.junit.vintage</groupId>
					<artifactId>junit-vintage-engine</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-mongodb</artifactId>
		</dependency>
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>javax.servlet-api</artifactId>
		</dependency>

	</dependencies>
	<dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-dependencies</artifactId>
				<version>\${spring-cloud.version}</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
		</dependencies>
	</dependencyManagement>
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>`
}

exports.createPomFileContent = createPomFileContent;