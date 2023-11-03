# Standalone with Python

```shell
yarn install
BD_USERNAME=myUsername BD_PASSWORD=myPassword yarn start
curl -s -H 'Content-Type: application/json' localhost:3000 -d "{\"statement\":\"SELECT * FROM parquet_scan('s3://boilingdata-demo/test.parquet') LIMIT 1;\"}" | jq .
```

```python
import requests
data = requests.post("http://localhost:3000", json={"statement":"SELECT * FROM parquet_scan('s3://boilingdata-demo/test.parquet') LIMIT 1;"})
print(data.json())
```
