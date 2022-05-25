import nltk
import pymorphy2

from nltk import word_tokenize
from nltk.corpus import stopwords
from string import punctuation

nltk.download('stopwords')

class Preprocessor(object):
    def __init__(self, language='russian', column='entity'):
        self.language_ = language
        self.column_ = column

        punc = list(set(punctuation)) + ['№', '¶', '«', '»', '“', '”', '…', '–', '－']
        stopwords_ru = punc + stopwords.words('russian')
        stopwords_en = punc + stopwords.words('english')
        self.stopwords_ = stopwords_ru if language == 'russian' else stopwords_en

        self.morph_ = pymorphy2.MorphAnalyzer()

    def __call__(self, df):
        df = df.copy()
  
        # Convert text to lowercase
        df['lower_text'] = df[self.column_].str.lower()

        # Word tokenize
        df['tokenized'] = df['lower_text'].apply(word_tokenize)

        # Remove Stop Words
        df['filtered'] = df['tokenized'].apply(lambda tokens: [t for t in tokens if t not in self.stopwords_])

        # Lemmatizing
        df['lemmatized'] = df['filtered'].apply(lambda tokens: [self.morph_.parse(t)[0].normal_form for t in tokens])

        # Normalizing
        df['normalized'] = df['lemmatized'].apply(lambda tokens: ' '.join(tokens))

        return df
