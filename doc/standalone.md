# Standalone with Python

## Build and start

```shell
node --version  # you need node v18 or later
yarn install    # or npm install
yarn build      # or npm run build
# You need to register to BoilingData and pass the credentials via env variables to Boiling HTTP Gateway
BD_USERNAME=myUsername BD_PASSWORD=myPassword docker-compose up -d
```

### Curl example

```shell
curl -s -H 'Content-Type: application/json' localhost:3100 \
    -d "{\"statement\":\"SELECT * FROM parquet_scan('s3://boilingdata-demo/test.parquet');\"}"
```

### Python example 1

```python
import requests

sql = "SELECT * FROM parquet_scan('s3://boilingdata-demo/test.parquet');"
data = requests.post("http://localhost:3100",json={"statement":sql})
print(data.json())
```

### Python example 2

```python
import pandas as pd
import requests

## BoilingData HTTP GW runs on port 3100 and it establishes an authenticated and secure connection to BoilingData
def run_bd(sql):
    return requests.post("http://localhost:3100", json={"statement": sql}).json()

## Return the results as DF
def run_bd_df(sql):
    return pd.DataFrame.from_dict(run_bd(sql))

sql = "SELECT * FROM parquet_scan('s3://boilingdata-demo/test.parquet')"
print(run_bd(sql))
print(run_bd_df(sql))
```

```shell
[{'registration_dttm': '2016-02-03 07:55:29+00', 'id': 1, 'first_name': 'Amanda', 'last_name': 'Jordan', 'email': 'ajordan0@com.com', 'gender': 'Female', 'ip_address': '1.197.201.2', 'cc': '6759521864920116', 'country': 'Indonesia', 'birthdate': '3/8/1971', 'salary': 49756.53, 'title': 'Internal Auditor', 'comments': '1E+02'}, {'registration_dttm': '2016-02-03 17:04:03+00', 'id': 2, 'first_name': 'Albert', 'last_name': 'Freeman', 'email': 'afreeman1@is.gd', 'gender': 'Male', 'ip_address': '218.111.175.34', 'cc': '', 'country': 'Canada', 'birthdate': '1/16/1968', 'salary': 150280.17, 'title': 'Accountant IV', 'comments': ''}, {'registration_dttm': '2016-02-03 01:09:31+00', 'id': 3, 'first_name': 'Evelyn', 'last_name': 'Morgan', 'email': 'emorgan2@altervista.org', 'gender': 'Female', 'ip_address': '7.161.136.94', 'cc': '6767119071901597', 'country': 'Russia', 'birthdate': '2/1/1960', 'salary': 144972.51, 'title': 'Structural Engineer', 'comments': ''}, {'registration_dttm': '2016-02-03 00:36:21+00', 'id': 4, 'first_name': 'Denise', 'last_name': 'Riley', 'email': 'driley3@gmpg.org', 'gender': 'Female', 'ip_address': '140.35.109.83', 'cc': '3576031598965625', 'country': 'China', 'birthdate': '4/8/1997', 'salary': 90263.05, 'title': 'Senior Cost Accountant', 'comments': ''}, {'registration_dttm': '2016-02-03 05:05:31+00', 'id': 5, 'first_name': 'Carlos', 'last_name': 'Burns', 'email': 'cburns4@miitbeian.gov.cn', 'gender': '', 'ip_address': '169.113.235.40', 'cc': '5602256255204850', 'country': 'South Africa', 'birthdate': '', 'salary': None, 'title': '', 'comments': ''}, {'registration_dttm': '2016-02-03 07:22:34+00', 'id': 6, 'first_name': 'Kathryn', 'last_name': 'White', 'email': 'kwhite5@google.com', 'gender': 'Female', 'ip_address': '195.131.81.179', 'cc': '3583136326049310', 'country': 'Indonesia', 'birthdate': '2/25/1983', 'salary': 69227.11, 'title': 'Account Executive', 'comments': ''}, {'registration_dttm': '2016-02-03 08:33:08+00', 'id': 7, 'first_name': 'Samuel', 'last_name': 'Holmes', 'email': 'sholmes6@foxnews.com', 'gender': 'Male', 'ip_address': '232.234.81.197', 'cc': '3582641366974690', 'country': 'Portugal', 'birthdate': '12/18/1987', 'salary': 14247.62, 'title': 'Senior Financial Analyst', 'comments': ''}, {'registration_dttm': '2016-02-03 06:47:06+00', 'id': 8, 'first_name': 'Harry', 'last_name': 'Howell', 'email': 'hhowell7@eepurl.com', 'gender': 'Male', 'ip_address': '91.235.51.73', 'cc': '', 'country': 'Bosnia and Herzegovina', 'birthdate': '3/1/1962', 'salary': 186469.43, 'title': 'Web Developer IV', 'comments': ''}, {'registration_dttm': '2016-02-03 03:52:53+00', 'id': 9, 'first_name': 'Jose', 'last_name': 'Foster', 'email': 'jfoster8@yelp.com', 'gender': 'Male', 'ip_address': '132.31.53.61', 'cc': '', 'country': 'South Korea', 'birthdate': '3/27/1992', 'salary': 231067.84, 'title': 'Software Test Engineer I', 'comments': '1E+02'}, {'registration_dttm': '2016-02-03 18:29:47+00', 'id': 10, 'first_name': 'Emily', 'last_name': 'Stewart', 'email': 'estewart9@opensource.org', 'gender': 'Female', 'ip_address': '143.28.251.245', 'cc': '3574254110301671', 'country': 'Nigeria', 'birthdate': '1/28/1997', 'salary': 27234.28, 'title': 'Health Coach IV', 'comments': ''}]
        registration_dttm  id first_name last_name                     email  ...                 country   birthdate     salary                     title comments
0  2016-02-03 07:55:29+00   1     Amanda    Jordan          ajordan0@com.com  ...               Indonesia    3/8/1971   49756.53          Internal Auditor    1E+02
1  2016-02-03 17:04:03+00   2     Albert   Freeman           afreeman1@is.gd  ...                  Canada   1/16/1968  150280.17             Accountant IV
2  2016-02-03 01:09:31+00   3     Evelyn    Morgan   emorgan2@altervista.org  ...                  Russia    2/1/1960  144972.51       Structural Engineer
3  2016-02-03 00:36:21+00   4     Denise     Riley          driley3@gmpg.org  ...                   China    4/8/1997   90263.05    Senior Cost Accountant
4  2016-02-03 05:05:31+00   5     Carlos     Burns  cburns4@miitbeian.gov.cn  ...            South Africa                    NaN
5  2016-02-03 07:22:34+00   6    Kathryn     White        kwhite5@google.com  ...               Indonesia   2/25/1983   69227.11         Account Executive
6  2016-02-03 08:33:08+00   7     Samuel    Holmes      sholmes6@foxnews.com  ...                Portugal  12/18/1987   14247.62  Senior Financial Analyst
7  2016-02-03 06:47:06+00   8      Harry    Howell       hhowell7@eepurl.com  ...  Bosnia and Herzegovina    3/1/1962  186469.43          Web Developer IV
8  2016-02-03 03:52:53+00   9       Jose    Foster         jfoster8@yelp.com  ...             South Korea   3/27/1992  231067.84  Software Test Engineer I    1E+02
9  2016-02-03 18:29:47+00  10      Emily   Stewart  estewart9@opensource.org  ...                 Nigeria   1/28/1997   27234.28           Health Coach IV

[10 rows x 13 columns]
```
