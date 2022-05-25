import os
import pandas as pd
import pickle

from datetime import datetime
from os import path

from training import training_manager

_models_root_directory = "./models"

def get_model_directory(templateId, language, timestamp):
    return path.abspath(path.join(_models_root_directory, templateId, language, timestamp))


def get_model(templateId, language, timestamp):
    model_dir = get_model_directory(templateId, language, timestamp)

    preprocessor = pickle.load(open(path.join(model_dir, 'preprocessor.sav'), 'rb'))
    vectorizer = pickle.load(open(path.join(model_dir, 'vectorizer.sav'), 'rb'))
    classifier = pickle.load(open(path.join(model_dir, 'classifier.sav'), 'rb'))

    return (preprocessor, vectorizer, classifier)

def save_model(templateId, language, preprocessor, vectorizer, classifier):
    timestamp = datetime.now().strftime("%Y-%m-%d.%H-%M")

    model_dir = get_model_directory(templateId, language, timestamp)
    os.makedirs(model_dir, exist_ok=True)

    with open(path.join(model_dir, 'preprocessor.sav'), 'wb') as writer:
        pickle.dump(preprocessor, writer)
    
    with open(path.join(model_dir, 'vectorizer.sav'), 'wb') as writer:
        pickle.dump(vectorizer, writer)
    
    with open(path.join(model_dir, 'classifier.sav'), 'wb') as writer:
        pickle.dump(classifier, writer)

    return timestamp


def get_training_set(templateId, language, timestamp):
    model_dir = get_model_directory(templateId, language, timestamp)

    return pd.read_parquet(path.join(model_dir, 'training_set.parquet'))

def save_training_set(templateId, language, timestamp, entities, categories):
    model_dir = get_model_directory(templateId, language, timestamp)
    os.makedirs(model_dir, exist_ok=True)

    df = pd.DataFrame({ 'entity': entities, 'category': categories })

    df.to_parquet(path.join(model_dir, 'training_set.parquet'))


def train_and_save(templateId, language, entities, categories):
    (preprocessor, vectorizer, classifier) = training_manager.train(language, entities, categories)

    timestamp = save_model(templateId, language, preprocessor, vectorizer, classifier)
    save_training_set(templateId, language, timestamp, entities, categories)

    return timestamp

def tune_and_save(templateId, language, timestamp, entities, categories):
    manual_assignments = pd.DataFrame({ 'entity': entities, 'category': categories })

    training_set = get_training_set(templateId, language, timestamp)

    unchanged_assignments = ~training_set['entity'].isin(manual_assignments['entity'])
    new_training_set = training_set[unchanged_assignments].append(manual_assignments)

    new_entities = new_training_set['entity'].to_list()
    new_categories = new_training_set['category'].to_list()

    return train_and_save(templateId, language, new_entities, new_categories)
