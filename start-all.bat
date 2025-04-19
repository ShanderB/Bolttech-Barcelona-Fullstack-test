@echo off

docker-compose -f backend-car-rental/docker-compose.yml up -d
docker-compose -f webapp-car-rental/docker-compose.yml up -d