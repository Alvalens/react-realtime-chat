# React Real-time Chat

![visitor badge](https://visitor-badge.laobi.icu/badge?page_id=re.visitor-badge)

Experience the power of real-time communication with the Realtime Group Chat WebApp – my ambitious project that delves into the world of interactive web development using React. As my second major project, this venture is aimed at expanding my skill setand learning new concepts within the realm of React and real-time applications. If you find any bugs or have suggestion just contact me!

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

## Features

* **Group:** Create a group before chatting in realtime!
* **Chat Room:** Engage in real-time conversations with others in a user-friendly chat interface.
* **User Authentication:** Securely access the chat room with user authentication.

## Installation

1. Ensure you have [pnpm](https://pnpm.io/) installed. If not, you can install it using:

   ```shell
   npm install -g pnpm
   ```
2. Clone the repository:

   ```shell
   git clone https://github.com/Alvalens/react-realtime-chat.git
   ```
3. Navigate to the project directory:

   ```shell
   cd react-realtime-chat
   ```
4. Copy the .env.example rename to .env and fill the envoritment variable.

   ```.env
   VITE_REACT_APP_API_KEY=
   VITE_REACT_APP_AUTH_DOMAIN=
   VITE_REACT_APP_PROJECT_ID=
   VITE_REACT_APP_STORAGE_BUCKET=
   VITE_REACT_APP_MESSAGING_SENDER_ID=
   VITE_REACT_APP_APP_ID=
   VITE_REACT_APP_MEASUREMENT_ID=
   ```
5. Install dependencies:

   ```
   pnpm install
   ```
6. Start the development server

   ```shell
   pnpm run dev
   ```

## Usage

You can access these pages after you login with google or github in the home page

### Chat Home

* Create a new group: you can start chatting once you had a group or there a listed group in chat home page.
* Editing group info: By holding or right click a group you can change name or icon to your group `you can only edit your own group info.`
* Delete group: you can also delete your own group and messages stored there.
* Join group chat: join group by simply clicking the group.

### Chat Page

* Send messages: Type your message in the input field and press "Send" to contribute to the conversation.
* View messages: See the ongoing chat conversation in the chat area.
* User icons: Each message is associated with the sender's username and a unique user icon based on their account.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is licensed under the GPL-3.0 License seethe [LICENSE](LICENSE) file for details.
