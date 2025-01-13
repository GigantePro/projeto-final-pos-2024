from django.db import models

# Model User
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name

# Model ToDo
class ToDo(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

# Model Post
class Post(models.Model):
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField()

    def __str__(self):
        return self.title

# Model Comment
class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    body = models.TextField()
    email = models.EmailField()

    def __str__(self):
        return f'Comment by {self.email}'

# Model Album
class Album(models.Model):
    user = models.ForeignKey(User, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

# Model Photo
class Photo(models.Model):
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    url = models.URLField()

    def __str__(self):
        return self.title
