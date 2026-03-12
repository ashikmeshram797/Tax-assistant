import json
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def generate_keywords(question):
    q = question.lower()

    words = q.replace("?", "").split()

    keywords = []
    for w in words:
        if len(w) > 2:
            keywords.append(w)

    keywords.append(q)
    keywords.append(q.replace("what is", "define"))
    keywords.append(q.replace("what is", "explain"))

    return list(set(keywords))

def format_answer(answers):

    if len(answers) == 1:
        return answers[0]

    text = "Here is the information:\n\n"

    for ans in answers:
        text += "• " + ans + "\n"

    return text

with open("tax_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    for item in data:
        if "keywords" not in item or len(item["keywords"]) == 0:
            item["keywords"] = generate_keywords(item["question"])

questions = [item["question"] for item in data]

vectorizer = TfidfVectorizer()
question_vectors = vectorizer.fit_transform(questions)

def get_answer(user_query):

    query = user_query.lower()

    # keyword matching
    for item in data:
        for keyword in item.get("keywords", []):
            if keyword.lower() in query:
                answers = item.get("answers", [])
                if answers:
                    return " ".join(random.sample(answers, min(3, len(answers))))

    # similarity matching
    query_vec = vectorizer.transform([query])
    similarity = cosine_similarity(query_vec, question_vectors)
    index = similarity.argmax()

    if similarity[0][index] > 0.05:
        answers = data[index].get("answers", [])
        if answers:
            return " ".join(random.sample(answers, min(3, len(answers))))

    return "Sorry, I don't understand your question."