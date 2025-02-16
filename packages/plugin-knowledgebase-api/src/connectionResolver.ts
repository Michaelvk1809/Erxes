import * as mongoose from 'mongoose';
import {
  IArticleDocument,
  ICategoryDocument,
  ITopicDocument,
} from './models/definitions/knowledgebase';
import {
  IArticleModel,
  ICategoryModel,
  ITopicModel,
  loadArticleClass,
  loadCategoryClass,
  loadTopicClass,
} from './models/KnowledgeBase';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { createGenerateModels } from '@erxes/api-utils/src/core';
import { IConfigDocument, IConfigModel, loadConfigClass } from './models/Configs';

export interface IModels {
  KnowledgeBaseArticles: IArticleModel;
  KnowledgeBaseCategories: ICategoryModel;
  KnowledgeBaseTopics: ITopicModel;
  Configs: IConfigModel;
}
export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export const loadClasses = (db: mongoose.Connection): IModels => {
  const models = {} as IModels;

  models.KnowledgeBaseArticles = db.model<IArticleDocument, IArticleModel>(
    'knowledgebase_articles',
    loadArticleClass(models),
  );

  models.KnowledgeBaseCategories = db.model<ICategoryDocument, ICategoryModel>(
    'knowledgebase_categories',
    loadCategoryClass(models),
  );

  models.KnowledgeBaseTopics = db.model<ITopicDocument, ITopicModel>(
    'knowledgebase_topics',
    loadTopicClass(models),
  );

  models.Configs = db.model<IConfigDocument, IConfigModel>(
    'configs',
    loadConfigClass(models),
  );

  return models;
};

export const generateModels = createGenerateModels<IModels>(loadClasses);
