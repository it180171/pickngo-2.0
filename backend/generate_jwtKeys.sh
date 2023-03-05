mkdir jwt
openssl genrsa -out src/main/resources/pk/rsaPrivateKey.pem 2048
openssl rsa -pubout -in src/main/resources/pk/rsaPrivateKey.pem -out src/main/resources/pk/publicKey.pem
openssl pkcs8 -topk8 -nocrypt -inform pem -in src/main/resources/pk/rsaPrivateKey.pem -outform pem -out src/main/resources/pk/privateKey.pem
chmod 600 src/main/resources/pk/rsaPrivateKey.pem
chmod 600 src/main/resources/pk/privateKey.pem