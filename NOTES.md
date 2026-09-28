M1 verify step: the $ for i in $(seq 1 6); do curl -s localhost/whoami; echo; done command gives alternating hostname of the two replicas of app service. They are served by round robin which is default in traefik.

