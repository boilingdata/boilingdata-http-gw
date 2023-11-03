# BoilingData HTTP Gateway

1. Checkout [Buenavista Boiling Proxy](https://github.com/dforsber/buenavista) and create docker image.
2. Compile and build (this) Boiling HTTP Gateway
3. See the [docker-compose.yml](docker-compose.yml) file for running some BI Tools

You can run queries both locally and remote on Boiling from the same BI Tool interface as Buenavista Proxy accompanies DuckDB database. Your BI Tool does not need to know the difference, it's all SQL.

```shell
yarn build
BD_USERNAME=myBdAccount@cc.com BD_PASSWORD=myBdSecretPw docker-compose up
```

## Standalone

See [standalone with python](doc/standalone.md).
