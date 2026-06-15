@echo off
setlocal

set "MAVEN_PROJECTBASEDIR=%~dp0"
set "MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%"
set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain"

if not "%JAVA_HOME%" == "" goto useJavaHome
set "MAVEN_JAVA_EXE=java"
goto validateWrapper

:useJavaHome
set "MAVEN_JAVA_EXE=%JAVA_HOME%\bin\java.exe"
if exist "%MAVEN_JAVA_EXE%" goto validateWrapper
echo.
echo Error: JAVA_HOME is set to an invalid directory. 1>&2
echo JAVA_HOME = "%JAVA_HOME%" 1>&2
echo Please set JAVA_HOME to a JDK installation directory. 1>&2
echo.
exit /B 1

:validateWrapper
if exist "%WRAPPER_JAR%" goto runMaven
echo.
echo Error: Maven wrapper jar was not found. 1>&2
echo Expected: "%WRAPPER_JAR%" 1>&2
echo.
exit /B 1

:runMaven
"%MAVEN_JAVA_EXE%" %JVM_CONFIG_MAVEN_PROPS% %MAVEN_OPTS% %MAVEN_DEBUG_OPTS% -classpath "%WRAPPER_JAR%" "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" %WRAPPER_LAUNCHER% %MAVEN_CONFIG% %*
exit /B %ERRORLEVEL%
