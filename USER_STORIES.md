# User Stories - LearnerApp

1. **Sign up**
   As a new user, I want to register with a username, email and password, so that I can create my own account.
   *Acceptance:* All three fields are required. An error shows if a field is empty or the email is already registered.

2. **Login**
   As a registered user, I want to log in with my email and password, so that I can access the app.
   *Acceptance:* Wrong credentials show an error message. Correct credentials open the Home screen.

3. **Home screen**
   As a user, I want to see a list of items with the app logo in the header, so that I can browse content easily.
   *Acceptance:* The header shows the logo and app name. Each item card has a navigation icon.

4. **Item details**
   As a user, I want to tap an item and see its details, so that I can read more about it.
   *Acceptance:* Tapping a card opens the Detail screen with the item's title and information.

5. **Save favorites**
   As a user, I want to add an item to my favorites, so that I can find it again later.
   *Acceptance:* A heart button on the Detail screen adds or removes the item.

6. **Persistent favorites**
   As a user, I want my favorites to stay saved after I close the app, so that I do not lose them.
   *Acceptance:* Favorites are stored in local storage and shown on the Favorites screen.

7. **Online data**
   As a user, I want the app to load fresh content from an online API, so that I always see real data.
   *Acceptance:* Home shows data fetched from the API, with a loading indicator and an error message if it fails.

8. **Settings**
   As a user, I want a settings menu, so that I can manage the app in one place.
   *Acceptance:* A settings icon on Home opens a Settings screen with menu items (Favorites, Notifications, About, Log out).

9. **Notifications**
   As a user, I want to enable notifications, so that I get alerts from the app.
   *Acceptance:* The Notifications screen asks for permission and can send a test notification.