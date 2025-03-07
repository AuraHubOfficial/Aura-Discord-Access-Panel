import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_BOT_TOKEN,
  DISCORD_GUILD_ID,
  DISCORD_ROLE_ID
} = process.env;

app.get('/auth/discord/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ success: false, error: 'No authorization code provided' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:5174/auth/discord/callback',
        scope: 'identify guilds.join guilds',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token Error:', tokenData);
      throw new Error(tokenData.error_description || 'Failed to get access token');
    }

    // Get user info
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error('User Error:', userData);
      throw new Error('Failed to get user data');
    }

    // Add user to server if not already a member
    const addToServerResponse = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/members/${userData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: tokenData.access_token,
      }),
    });

    if (!addToServerResponse.ok && addToServerResponse.status !== 204) {
      const errorData = await addToServerResponse.json();
      console.error('Server Join Error:', errorData);
      throw new Error('Failed to add user to server');
    }

    // Add role to user
    const addRoleResponse = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/members/${userData.id}/roles/${DISCORD_ROLE_ID}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!addRoleResponse.ok && addRoleResponse.status !== 204) {
      const errorData = await addRoleResponse.json();
      console.error('Role Assignment Error:', errorData);
      throw new Error('Failed to assign role');
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Auth server running on http://localhost:3000');
});