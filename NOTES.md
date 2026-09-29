M1 verify step: the $ for i in $(seq 1 6); do curl -s localhost/whoami; echo; done command gives alternating hostname of the two replicas of app service. They are served by round robin which is default in traefik.

M3: downsides of not using queue:

dedicated cron-only replica: not all truth is in one place. If there is a cron here it could interfere with other non-cron data operations.

Postgres advisory lock: only prevents 2 crons not running the same job at the same time, every replica still queries the database even though it mught not execute the job, no retries or history as well, queue can catch up, this cant.

Leader election: when leader fails, there is certain empty period while a new leader is picked from followers, and also no history or retries.
 