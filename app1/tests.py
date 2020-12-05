from django.test import TestCase, Client
from django.urls import reverse
from json import loads


# Create your tests here.


class TestCaseStory8(TestCase):
    def test_root_url_check(self):
        response = Client().get(reverse('story_8:index'), follow=True)
        self.assertEqual(response.status_code, 200)

    def test_index_views_check(self):
        response = Client().get(reverse('story_8:index'), follow=True)
        self.assertIn("Find your book", response.content.decode('utf-8'))

    def test_views_api(self):
        response = Client().get(reverse('story_8:api') + "?q=test", follow=True)
        self.assertIn("items", response.content.decode('utf-8'))
