___Для запуска приложения необходимо:___
___
* Создайте базу данных и пользователя
```psql postgres --u unite```
* Затем введите эту команду для создания нового пользователя с паролем, а затем дайте доступ для создания базы данных.

postgres-# CREATE ROLE unite WITH LOGIN PASSWORD '123';
postgres-# ALTER ROLE unite CREATEDB;

Выйдите из `psql`, затем снова войдите в систему, используя ранее созданного нового пользователя.
postgres-# \q
psql postgres -U unite
Введите пароль, затем вы войдете в эту консоль `psql`.

psql (9.5.13)
Type "help" for help.

postgres=>
Введите эту команду для создания новой базы данных.

postgres=> CREATE DATABASE node_practice;

Затем дайте этому новому пользователю привилегии для новой базы данных, а затем выйдите из `psql`.

postgres=> GRANT ALL PRIVILEGES ON DATABASE node_practice TO unite;
postgres=> \q
* Создайте или сгенерируйте модели Sequelize и миграции

sequelize model:create --name News --attributes news_name:string
sequelize model:create --name User --attributes news_id:integer,user_name:string

* Эта команда создает файл модели в папке модели и файл миграции в папке миграции. Затем измените `models/news.js`, затем добавьте связь с моделью `User` внутри функции `associate`.

  class News extends Model {
    static associate(models) {
      News.hasMany(models.User, {
        foreignKey: 'news_id',
        as: 'users',
      });
    }
  };
* Затем измените `models/user.js`, затем добавьте связь с моделями `News`  внутри функции `associate`.

  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Classroom, {
        foreignKey: 'classroom_id',
        as: 'classroom'
              });
    }
  };

* Наконец, для миграций ничего не меняется, и все они готовы сгенерировать таблицу для базы данных PostgreSQL. Введите эту команду, чтобы создать таблицу в базе данных с помощью Sequelize.

```sequelize db:migrate```

* Прописываем контроллеры для news & user
* Прописываем расширенный экспресс-маршрут и функция для ассоциации
 addWithUsers(req, res) {
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        };
        return News
        .create({
            user_id: req.body.userId,
            news_title: req.body.title,
            news_text: req.body.text,
            users: req.body.users,
        }, {
            include: [{
                model: User,
                as: 'users'
            }]
        })
        .then((news) => res.status(201).send(news))
        .catch((error) => res.status(400).send(error));
    },


* Затем добавьте эту новую функцию в файл маршрута `routes/index.js`.
```router.post('/api/news/add_with_user', newsController.addWithuser);```
___

* Запускаем приложение командой:
```nodemon```
* Иcпользуем http://localhost:3000/