#!/bin/bash

docker-compose down -v > /dev/null 2>&1 && echo "Docker Compose stopped successfully" || echo "Error stopping Docker Compose"

rm -f wallets.json > /dev/null 2>&1 && echo "wallets.json removed successfully" || echo "Error removing wallets.json"

echo "Script completed"
