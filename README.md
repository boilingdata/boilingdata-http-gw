# BoilingData HTTP Gateway

1. Compile and build Boiling HTTP Gateway: `yarn build`
2. Checkout [Buenavista Boiling Proxy](https://github.com/dforsber/buenavista) and build it (creates `buenavista` docker image)
3. Start e.g. Metabase, Boiling Buenavista, and Boiling HTTP GW locally and start querying: `BD_USERNAME=myBdAccount@cc.com BD_PASSWORD=myBdSecretPw docker-compose up`

See the [docker-compose.yml](docker-compose.yml) file for running some BI Tools.

> You can run queries both locally and remote on Boiling from the same BI Tool interface as Buenavista Proxy accompanies DuckDB database. Your BI Tool does not need to know the difference, it's all SQL.

## Standalone

See [standalone with python](doc/standalone.md).
