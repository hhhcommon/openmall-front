#!/usr/bin/env bash
# DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# cd ${DIR}

# hub.docker.com/szopen
group=szopen
#docker login -u szopen --password

# docker运行npm
#sh ../tool/npm-run-build.sh
# 本地npm执行
#npm config set registry https://registry.npm.taobao.org
npm config set unsafe-perm true
npm install
npm run build

artifactId=mall-vue
version=0.1-SNAPSHOT
# docker
docker build -t ${artifactId}:${version} -f ./Dockerfile .
docker tag ${artifactId}:${version} ${group}/${artifactId}:${version}
#docker push ${group}/${artifactId}:${version}
