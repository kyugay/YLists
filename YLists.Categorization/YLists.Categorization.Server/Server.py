
from concurrent import futures
import logging

import grpc
from grpc_reflection.v1alpha import reflection

import categorization_pb2
import categorization_pb2_grpc

from model_management import model_manager
from categorization import  categorization_manager

MAX_MESSAGE_LENGTH = 16_777_216

class Categorizer(categorization_pb2_grpc.CategorizationServicer):
    def Train(self, request, context):
        templateId = request.templateId
        language = request.language
        entities = [item.name for item in request.items]
        categories = [item.category for item in request.items]

        timestamp = model_manager.train_and_save(templateId, language, entities, categories)

        return categorizer_pb2.TrainResponse(timestamp=timestamp)
    
    def Tune(self, request, context):
        templateId = request.templateId
        language = request.language
        timestamp = request.timestamp
        entities = [item.name for item in request.items]
        categories = [item.category for item in request.items]

        timestamp = model_manager.tune_and_save(templateId, language, timestamp, entities, categories)

        return categorizer_pb2.TuneResponse(timestamp=timestamp)

    def Categorize(self, request, context):
        templateId = request.templateId
        language = request.language
        timestamp = request.timestamp
        entities = request.items

        result = categorization_manager.categorize(templateId, language, timestamp, entities)

        response_items = [categorizer_pb2.CategorizeResponse().Item(id=id, category=category, probability=probability) for id, category, probability in list(result)]
        response = categorizer_pb2.CategorizeResponse(items=response_items)
        
        return response


def serve():
    logging.info('Starting server...')

    server = grpc.server(futures.ThreadPoolExecutor(max_workers = 10),
        options = [
            ('grpc.max_send_message_length', MAX_MESSAGE_LENGTH),
            ('grpc.max_receive_message_length', MAX_MESSAGE_LENGTH),
        ]
    )

    categorization_pb2_grpc.add_CategorizationServicer_to_server(Categorizer(), server)
    SERVICE_NAMES = (
        categorization_pb2.DESCRIPTOR.services_by_name['Categorization'].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)
    server.add_insecure_port('[::]:50550')
    server.start()

    logging.info('serving on port 50550')

    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig(filename='log.txt', level=logging.INFO)
    serve()