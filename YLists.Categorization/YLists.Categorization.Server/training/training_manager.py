import numpy as np
import pandas as pd

from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV, train_test_split

from .preprocessor import Preprocessor

def resampling(X, y_column='category'):
    X = X.copy()

    # resampling training data with rare labels
    category_group = X[y_column].value_counts()
    unique_categories = category_group[category_group.values == 1].index.values

    X_unique = X[(X[y_column].isin(unique_categories))].copy()
    X = X.append(X_unique)

    return X


def reduce_vocabulary(X, y, ngram_range=(1, 5), tfidf_threshold=0.2):
    unique_classes = np.sort(y.unique())

    reduced_vocabulary = []
    tfidf = TfidfVectorizer(stop_words=None, token_pattern='(?u)\\b\\w+\\b', ngram_range=ngram_range, analyzer='char_wb')

    # Exclude grams with low tfidf per class
    for i in unique_classes:
        X_tfidf = tfidf.fit_transform(X[y == i])
        inv_voc = {v: k for k, v in tfidf.vocabulary_.items()}
        for index in np.where(np.any(X_tfidf.toarray() >= tfidf_threshold, axis=0))[0]:
            reduced_vocabulary.append(inv_voc[index])

    reduced_vocabulary = sorted(list(set(reduced_vocabulary)))
    return reduced_vocabulary


def get_classifier():
    classifier = LogisticRegression()
    parameters = [
        {'solver': ['newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga']},
        {'penalty': ['none', 'elasticnet', 'l1', 'l2']},
        {'C': [0.001, 0.01, 0.1, 1, 10, 100, 1000]},
        {'max_iter': [100, 1000]}
    ]

    grid_search = GridSearchCV(estimator=classifier, param_grid=parameters, scoring='accuracy', cv=3, verbose=0)

    return grid_search


def train(language, X, y):
    X_train = pd.DataFrame({ 'entity': X, 'category': y })

    X_train, X_test = train_test_split(X_train, test_size=0.2, random_state=0)
    X_train = resampling(X_train)

    preprocessor = Preprocessor(language=language)

    X_train = preprocessor(df=X_train)
    X_test = preprocessor(df=X_test)

    reduced_vocabulary = reduce_vocabulary(X_train['normalized'], X_train['category'])
    vectorizer = CountVectorizer(stop_words=None, token_pattern='(?u)\\b\\w+\\b', vocabulary=reduced_vocabulary,
                                ngram_range=(1, 5), analyzer='char_wb', max_df=1.0, min_df=1, binary=True,
                                dtype=np.int8)

    X_train_enc = vectorizer.fit_transform(X_train['normalized'])
    X_test_enc = vectorizer.transform(X_test['normalized'])

    if not X_train_enc.has_sorted_indices: X_train_enc.sort_indices()
    if not X_test_enc.has_sorted_indices: X_test_enc.sort_indices()

    classifier = get_classifier()

    classifier.fit(X_train_enc, X_train['category'])

    y_test_predict = classifier.predict(X_test_enc)
    y_test_proba = classifier.predict_proba(X_test_enc)

    return (preprocessor, vectorizer, classifier, y_test_predict, y_test_proba)
