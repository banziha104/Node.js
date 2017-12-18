# ssh 접속

1. chmod 700 test.pem : 키파일 권한 최소화
2. ssh -i "Test.pem" ubuntu@ec2-13-124-117-190.ap-northeast-2.compute.amazonaws.com

<br />

---

# node.js 설치

1. sudo apt-get install curl : curl 설치 (Ubuntu용 패키지 매니저)
2. curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - : 노드를 가져옮
3. sudo apt-get install -y nodejs : 노드 설치
4. npm -v : npm 확인
5. node -v : node 확인
6. sudo npm install -g express express-generator nodemon : express와 nodemon 전역 설치
7. npm list -g --depth=0 : 설치한 리스트 확인
8. mkdir myproject : 프로젝트를 만듬
9. sudo chown ubuntu:ubuntu myproject : myproject에 ubuntu 사용자가 접근할 수 있게 권한 부여

<br />

---

# pm2 

> 백그라운드에서 node.js를 실행시키고 오류가 있을시, 서버를 내렸다가 다시 올리는 역할
1. sudo npm install -g pm2 : pm2 설치
2. pm2 start
3. pm2 start bin/www
4. pm2 list : pm2 리스트 보기
5. pm2 stop <id> : <id>를 가진 프로세스 종료

<br />

---

# project upload

1. sudo rm -rf myproject/ : 기존 프로젝트 삭제
2. sudo mkdir myproject/ : 프로젝트 폴더 생성
3. sudo chown ubuntu:ubuntu myproject/
4. ls -al : 권한 확인

# MongoDB 설치

1. sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 
--recv 0C49F3730359A14518585931BC711F9BA15703C6 : 키버전 확인
2. echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" 
| sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list : 우분투 16.04 버전에 맞게 설치
3. sudo apt-get update : update
4. sudo apt-get install -y mongodb-org : mongodb 설치
5. sudo service mongod status : 돌아가는지 확

# nginx 설치

1. sudo vi /etc/apt/sources.list : sources.list 파일 열기
2. deb http://nginx.org/packages/ubuntu/ xenial nginx
   deb-src http://nginx.org/packages/ubuntu/ xenial nginx
   : 두줄 추가
3. sudo apt-get update : 소스리스트 반영
4. sudo apt-get install nginx : nginx 설치
5. sudo service nginx start : nginx 가동
6. nginx 가동명령어들

```
sudo service nginx status
sudo service nginx start
sudo service nginx stop
sudo service nginx restart
sudo service nginx reload
```

# Node.js & Nginx 배포 세팅

1. pm2 start app.js : pm2로 시작
2. aws 콘솔에서 3000번 포트 삭제
3. cd /etc/nginx : nginx 폴더로 이동
4. /etc/nginx/nginx.conf : nginx가 처음 실행 될때의 파일이 모아져 있음
5. /etc/nginx/conf.d/default.conf : 현재 location이나 프록시 설정
6. cd /etc/nginx/conf.d 
7. sudo vi default.conf : 파일을 수정
8. location 부분을 아래로 바꿈

```
location / {
        proxy_pass http://127.0.0.1:3000/;
    }
```

9.sudo service nginx reload

