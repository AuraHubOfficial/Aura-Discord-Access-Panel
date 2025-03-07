# Aura Discord Auth Panel

**Aura Discord Auth Panel** is a powerful web application that allows users to authenticate using their Discord account and automatically gain a specific role in your Discord server. With this tool, you can easily manage access to your server and reward your community members with special roles when they log in through Discord.

## Features

- 🔒 **Secure Authentication** using Discord OAuth2
- 🎮 Automatically **assign roles** to users upon login
- 💬 Integrates seamlessly with your **Discord server**
- 🌐 **Web-based panel** for easy user access and management
- 🔄 **Syncs roles** with your server in real-time
- ⚡ **Fast and responsive** user experience

## Tech Stack

This project is built with the following technologies:

- **Frontend**: React.js
- **Discord OAuth2**: To handle the authentication
- **Deployment**: Heroku / Docker (optional)

## Installation

To get started, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/AuraHubOfficial/Aura-Discord-Access-Panel.git
2. Navigate into the project folder:
   ```bash
   cd Aura-Discord-Access-Panel
3. Install dependencies and run the project:
   ```bash
   npm i && npm run dev
## How To Configure
Before running the app, you need to set up some environment variables to integrate with Discord:

1. Open the terminal and type the following to open the project in VS Code (or your preferred code editor):
   ```bash
   code .
2. Inside the project folder, locate the .env.example file and rename it to .env:
    - On Linux/macOS, you can run:
    ```
    mv .env.example .env
    ```

    - On Windows, you can rename the file manually.

3. Open the `.env` file and add the following required variables:
    - `DISCORD_CLIENT_ID`: Your Discord application's Client ID.
    - `DISCORD_CLIENT_SECRET`: Your Discord application's Client Secret.
    - `DISCORD_BOT_TOKEN`: Your Discord bot's token (to interact with the Discord API).
    - `DISCORD_GUILD_ID`: The ID of your Discord server (guild).
    - `DISCORD_ROLE_ID`: The role ID you want to assign to users upon successful authentication.

    Example:
    ```
    DISCORD_CLIENT_ID=your_client_id_here
    DISCORD_CLIENT_SECRET=your_client_secret_here
    DISCORD_BOT_TOKEN=your_bot_token_here
    DISCORD_GUILD_ID=your_guild_id_here
    DISCORD_ROLE_ID=your_role_id_here
    ```

4. Save the file and run the application:
    ```
    npm run dev
    ```

## Showcase
<p>
  <img src="https://share.creavite.co/67c4558a89908441e5523935.gif" alt="Screenshots">
</p>

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.