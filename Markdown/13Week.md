# Docker
 
1. sudo service nginx stop : nginx 종료
2. pm2 stop all : pm2에 실행됙 있는 것들 종
3. pm2 list : 확인
4. curl -s https://get.docker.com/ | sudo sh : 도커설
5. docker version : 도커 확인
6. sudo usermod -aG docker ubuntu : 도커 권한 주기
7.

# DockerHub

* docker search ubuntu 
* docker pull ubuntu:latest : 우분투 이미지를 가져옮
* docker run ubuntu:latest /bin/echo 'Hello World’ : 헬로월드 찍어보기
* docker run -it centos /bin/bash : 리눅스 centOS에 접속 (-it는 표준입력을 뜻함)
* docker images : 이미지들 확
* docker run -d -p 80:80 --name webserver nginx : nignx 실행

# 이미지 삭

1. docker rmi <이미지명>
2.

# Docker 용어

* 도커 이미지 : 우분투 + nodejs + express 등 실행할 서비스들을 패키지화 해놓음
* 컨테이너 : 이미지를 토대로 서비를 띄원, 여러 개의 컨테이너가 작동함



