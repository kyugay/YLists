import numpy as np
import pandas as pd

from model_management import model_manager

def categorize(templateId, language, timestamp, entities):
    (preprocessor, vectorizer, classifier) = model_manager.get_model(templateId, language, timestamp)

    X = pd.DataFrame({ 'id': [entity.id for entity in entities], 'entity': [entity.name for entity in entities] })

    X = preprocessor(X)

    X_enc = vectorizer.fit_transform(X['normalized'])

    X['category'] = classifier.predict(X_enc)
    X['probability'] = np.amax(classifier.predict_proba(X_enc))

    return zip(X['id'], X['category'], X['probability'])
