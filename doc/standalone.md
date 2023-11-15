# Standalone with Python

Build the container and start it up.

```shell
node --version  # you need node v18 or later
yarn install    # or npm install
yarn build      # or npm run build
# You need to register to BoilingData and pass the credentials via env variables to Boiling HTTP Gateway
BD_USERNAME=myUsername BD_PASSWORD=myPassword docker-compose up -d
```

Query Boiling with curl or Python

```shell
curl -s -H 'Content-Type: application/json' localhost:3100 -d "{\"statement\":\"SELECT * FROM parquet_scan('s3://boilingdata-demo/test.parquet') LIMIT 1;\"}" | jq .
```

```python
import requests
data = requests.post("http://localhost:3100", json={"statement":"SELECT * FROM parquet_scan('s3://boilingdata-demo/test.parquet') LIMIT 1;"})
print(data.json())
```
