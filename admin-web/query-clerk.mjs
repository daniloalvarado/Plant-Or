import fetch from 'node-fetch';

async function main() {
  const response = await fetch('https://api.clerk.com/v1/users?limit=500', {
    headers: {
      'Authorization': `Bearer sk_live_6hlOk5bxUh8xkXXOk6e5xf3IBvnRlFTK8yIEICidXe`
    }
  });
  
  if (!response.ok) {
    console.error('Error fetching users:', response.status, await response.text());
    return;
  }
  
  const users = await response.json();
  console.log(`Clerk users in production: ${users.length}`);
}

main().catch(console.error);
