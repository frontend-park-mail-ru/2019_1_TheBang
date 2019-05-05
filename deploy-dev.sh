#!/bin/bash
chmod 600 ./2019_1_TheBang_id_rsa.pem
ssh-keyscan -H 95.163.212.32 >> ~/.ssh/known_hosts
scp -i ./2019_1_TheBang_id_rsa.pem dist/* ubuntu@95.163.212.32:/var/www/the-bang-dev