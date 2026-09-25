import os
import sys

# Support running from root or backend directory
try:
    from app import app
except ImportError:
    from backend.app import app

client = app.test_client()
res = client.get('/api/health')
print('Health check:', res.json)

samples = client.get('/api/samples').json
print(f'Retrieved {len(samples)} sample borrower profiles.')

for s in samples:
    pred = client.post('/api/predict', json=s['data']).json
    print(f"[{s['name']}] Risk: {pred['default_probability']}% | Tier: {pred['risk_tier']} | Decision: {pred['decision']}")

print('All API endpoints verified successfully!')
