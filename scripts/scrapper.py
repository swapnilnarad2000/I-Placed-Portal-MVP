import requests
from bs4 import BeautifulSoup

URL = "https://practice.geeksforgeeks.org/topic-tags/"
URL_ = "https://practice.geeksforgeeks.org/company-tags"
page = requests.get(URL)
page_ = requests.get(URL_)

soup = BeautifulSoup(page.content, "html.parser")
soup_ = BeautifulSoup(page_.content, "html.parser")
results_1 = soup.find(id="dataStructures")
results_2 = soup.find(id="algorithms")
results_3 = soup.find(id="others")
results = soup_.find_all("b")
# topics = results_1.find_all("b") + results_2.find_all("b") + results_3.find_all("b")


list_topics = []

for i in results:
    list_topics.append(i.text)

print(list_topics)
# print(results)