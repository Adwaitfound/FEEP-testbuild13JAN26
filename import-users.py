#!/usr/bin/env python3
import json
import subprocess
import sys
from pathlib import Path

def import_users():
    """Import users from JSON to new Firebase project using gcloud CLI"""
    
    json_file = Path('users-export.json')
    if not json_file.exists():
        print('❌ users-export.json not found. Run export-users.js first.')
        sys.exit(1)
    
    print('🔄 Importing users using gcloud CLI...\n')
    
    # Load users
    with open(json_file) as f:
        users = json.load(f)
    
    print(f'📥 Loaded {len(users)} users\n')
    print('⚙️  Creating users in feep-annual-event-stable-jan26...\n')
    
    results = {'ok': 0, 'exists': 0, 'failed': 0}
    created_emails = []
    
    for i, user in enumerate(users, 1):
        email = user['email']
        display_name = user['displayName'] or ''
        progress = f'[{i}/{len(users)}]'
        
        try:
            # Generate temp password
            import random, string
            temp_pass = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
            
            # Create user using gcloud
            cmd = [
                '/Users/adwaitparchure/Adwait Work/google-cloud-sdk/bin/gcloud',
                'identity-toolkit', 'accounts', 'create',
                f'--email={email}',
                f'--password={temp_pass}',
                f'--display-name={display_name}',
                '--project=feep-annual-event-stable-jan26'
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                results['ok'] += 1
                created_emails.append(email)
                print(f'{progress} ✓ {email}')
            elif 'already exists' in result.stderr:
                results['exists'] += 1
                print(f'{progress} ⚠️  {email} (already exists)')
            else:
                results['failed'] += 1
                print(f'{progress} ✗ {email} - {result.stderr[:100]}')
        except Exception as e:
            results['failed'] += 1
            print(f'{progress} ✗ {email} - {str(e)[:100]}')
    
    # Print summary
    print('\n' + '='*60)
    print('📊 IMPORT SUMMARY')
    print('='*60)
    print(f"✅ Created: {results['ok']}")
    print(f"⚠️  Already exist: {results['exists']}")
    print(f"❌ Failed: {results['failed']}")
    print('='*60)
    
    if results['ok'] > 0:
        print(f'\n✨ Successfully created {results["ok"]} users!')
        print('\n📝 Users with temporary passwords (need reset on first login):')
        for email in created_emails[:10]:
            print(f'  • {email}')
        if len(created_emails) > 10:
            print(f'  ... and {len(created_emails) - 10} more')

if __name__ == '__main__':
    import_users()
