#!/bin/bash
PORT=3333
npm run dev -- -p $PORT > dev_test_v2.log 2>&1 &
PID=$!
echo "Waiting for Next.js to start on port $PORT..."
sleep 10
echo "Curling API..."
curl -s -v -X POST http://localhost:$PORT/api/chat -H "Content-Type: application/json" -d @payload_fixed.json > curl_out_v2.txt 2>&1
echo "Curl finished with code $?"
kill $PID
echo "==== CURL OUTPUT ===="
cat curl_out_v2.txt
echo "==== DEV LOG ===="
cat dev_test_v2.log
