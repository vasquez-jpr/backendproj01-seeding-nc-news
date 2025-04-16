# NC News Seeding

## Instructions on how to set up the .env files:

1. Create two files, namely, <code>.env.test</code> and <code>.env.development</code>, in the project root

2. In each file:
    - for <code>.env.test</code>, add <code>PGDATABASE=nc_news_test</code>
    - for <code>.env.development</code>, add <code>PGDATABASE=nc_news</code>

- The value bound to <code>PGDATABASE</code> allows connection to the named database.