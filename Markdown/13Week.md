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

# Docker 명령어

1. docker rm <이미지명> : 이미지 삭제
2. docker run : 컨테이너 생성 및 구동
3. docker start : 컨테이너 구동
4. docker stop : 컨테이너 중지 

# Docker 파일 작성

1. cd /home/ubuntu :  위치로 이동
2. mkdir test1 : 디렉토리 생성
3. cd test1 : 디렉토리로 이동
4. vi index.html : html 문서생
5. vi Dockerfile : 도커 파일 생성

```angular2html
# centOS이미지를 기반으로 작성 , from 은 기반이미지
FROM centos:latest

# 아파치를 설치 
RUN yum install -y httpd

# 현재 폴더의 index.html파일을 아파치 첫화면으로 복사
COPY index.html /var/www/html/

# 아파치 실행
CMD ["/usr/sbin/httpd","-D","FOREGROUND"]
```

6. docker build -t test . : test 라는 컨테이너 명으로 현재위치(.) Dockerfile을 기반으로 생성
7. docker run -d -p 80:80 test : test 컨테이너 실행

# Docker 용어

* 도커 이미지 : 우분투 + nodejs + express 등 실행할 서비스들을 패키지화 해놓음
* 컨테이너 : 이미지를 토대로 서비를 띄원, 여러 개의 컨테이너가 작동함

# Docker compose

* 보통서비스
* nginx,node,mongodb 컨테이너를 띄운다
* link 옵션으로 연결

### 설치 및 실행

1. sudo curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose : 설치
2. sudo chmod +x /usr/local/bin/docker-compose : 권한 부
3. docker-compose -v : 확인
4. mkdir test2 : test2 폴더를 만듬
5. vi docker-compose.yml : docker compose 파일 생성 및 작성

```yaml
# nginx 이미지를 지정
nginx:
    build: ./nginx

    # nginx컨테이너는 node컨테이너를 연결
    links:
        - node 
    ports:
        - "80:80"

# node 이미지를 지정
node:
    build: ./node

    # node컨테이너는 mongodb컨테이너를 연결
    links:
        - mongodb:db_url
    ports:
        - "3000"

mongodb:
    image: mongo
    ports:
        - "27017"
    
    # 컨테이너를 내렸다 올릴때 데이터베이스도 초기화
    # volume을 지정해서 데이터 유지
    volumes: 
        - /data/db
```

6. mkdir nginx : nginx 폴더생성
7. cd nginx : nginx 폴더로 이동
8. vi Dockerfile : 도커 파일 작성

```yaml
# nginx기반
FROM nginx

# nginx.conf파일을 해당 파일에 붙여넣는다
COPY nginx.conf /etc/nginx/nginx.conf
```

9. vi nginx.conf

```yaml
worker_processes 4;

events { worker_connections 1024; }

http {

	upstream node-app {
	      least_conn;
	      server node:3000 weight=10 max_fails=3 fail_timeout=30s;
	}
	 
	server {
	      listen 80;
	 
	      location / {
	        proxy_pass http://node-app;
	        proxy_http_version 1.1;
	        proxy_set_header Upgrade $http_upgrade;
	        proxy_set_header Connection 'upgrade';
	        proxy_set_header Host $host;
	        proxy_cache_bypass $http_upgrade;
	      }
	}
}
```





