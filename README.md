# Setup

- Download and install JDK 17: https://adoptium.net/temurin/archive/?version=17
- Install Android Studio and a Virtual Device (emulator)
- Open the emulator
- Move `google-services.json` to the root of the project
- Create a `.env.local` file in the root of the project with the following lines (see .env.example):
```
EXPO_PUBLIC_APP_ID="The project_id value of the google-services.json file"
EXPO_PUBLIC_PROJECT_ID="The mobilesdk_app_id value of the google-services.json file"
```
- `npx expo run:android` to run the project
