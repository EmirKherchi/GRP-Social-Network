
####### Welcome sur mon projet - GRP Social Network - un reseau social 9gag like! ####### 


-----------------Afin d'executer le projet---------------- 

1 - Après avoir cloné le projet installer MySql sur votre machine

2-  Créer un dossier config dans le dossier Backend.

-------------------------------------------------------------------------

3- Au sein du dossier config créer un fichier config.json ajouter le code suivant et personnaliser les informations de connexion à votre base de données 

{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

-------------------------------------------------------------------------

 4 -Créer un fichier key.js dans le dossier config comme dans l'exemple suivant et personaliser votre clée de chiffrage: 
  const JWT_SIGN_SECRET = "CléePerso";
  exports.JWT_SIGN_SECRET = JWT_SIGN_SECRET;

-------------------------------------------------------------------------

5- Ouvrez le projet dans votre terminal. 

6 - Ouvrez le fichier Backend / dans le terminal tapez la ligne de commande suivante $ npm install

7-  Toujours dans le terminal dans le fichier Backend tappez la ligne de commande suivante : $ sequelize db:create

8-  Puis tapez la ligne de commande suivante $ sequelize db:migrate 

9- Afin de mettre en route le serveur sur le port: 8080; tapez la commande suivante : $ nodemon

-------------------------------------------------------------------------

10- Revenez à la racine du dossier cloné. 

11- Rendez-vous dans le dossier Frontend, une fois celui-ci ouvert dans le terminal tappez la commande suivant : $ npm install

12- Une fois la commande executer tapez la commande suivante : $ npm run serve

13- Rendez-vous à l'adresse indiquer par Vue-cli dans votre terminal de commande afin d'accedez à l'application et de créer votre profile d'utilisateur. 

-------------------------------------------------------------------------





