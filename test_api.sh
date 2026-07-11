#!/bin/bash
npm run dev > dev_test.log 2>&1 &
PID=$!
sleep 8
curl -s -v -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d @payload_fixed.json > curl_out.txt 2>&1
kill $PID
cat curl_out.txt
cat dev_test.log
