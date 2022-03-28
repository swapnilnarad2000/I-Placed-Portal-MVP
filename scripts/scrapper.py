import requests
from bs4 import BeautifulSoup

URL = "https://practice.geeksforgeeks.org/topic-tags/"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results_1 = soup.find(id="dataStructures")
results_2 = soup.find(id="algorithms")
results_3 = soup.find(id="others")
topics = results_1.find_all("b") + results_2.find_all("b") + results_3.find_all("b")


list_topics = []

for i in topics:
    list_topics.append(i.text)

print(list_topics)