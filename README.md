<h1 align="center">Welcome to Dead or Alive 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://circleci.com/gh/Zenika/deadoralive"><img src="https://circleci.com/gh/Zenika/deadoralive.svg?style=svg"></a>
</p>

> Quizz where you guess which rockstar is dead or alive.

### 🏠 [Homepage](https://deadoralive-666.firebaseapp.com)

## Install

```sh
yarn
```

### Firebase configuration

Firebase configuration is optional, if unavailable, player's data won't be stored.

* Create firebase project
* Activate firestore database
* Activate auth with Google
* Rename .env.sample to .env
* Fill all vars with values
* exec .env file before lauch the `yarn dev`

## Usage

```sh
yarn dev
```

## Deploy

Create a firebase project

Login to firebase :
```sh
firebase login
```

Get values from the console firebase
Export environnement variable :
```sh
export FIREBASE_API_KEY=""
export FIREBASE_PROJECT_ID=""
export GOOGLE_ANALYTICS=""
export FIREBASE_MESSAGING_ID=""
export FIREBASE_APP_ID=""
```

```sh
yarn deploy
```

## Contributors

👤 **Nicolas LEPAGE**

* Github: [@nlepage](https://github.com/nlepage)

👤 **Pierre-Yves Aillet**

* Github: [@pyaillet](https://github.com/pyaillet)

👤 **Patrice de Saint Steban**

* Github: [@patou](https://github.com/patou)

👤 **Guenever**

* Github: [@guenever](https://github.com/guenever)

👤 **Jérémy Lejeune**

* Github: [@yodur2potassium](https://github.com/yodur2potassium)

👤 **Mireille Campourcy**

* Github: [@mcampourcy](https://github.com/mcampourcy)

👤 **Stéphane Cohan** UI/UX Designer

* Github: [@stephanecohan](https://github.com/stephanecohan)

👤 **Marie Viley** RGPD consultant

* Github: [@Mayie](https://github.com/Mayie)

## Credits
 - [Svelte app template](https://github.com/sveltejs/template)
 - Wikipedia markup parser: [wtf_wikipedia](https://github.com/spencermountain/wtf_wikipedia)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
