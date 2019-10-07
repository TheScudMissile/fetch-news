import React, { useEffect, useState } from 'React';
import {
  Body,
  Button,
  Card,
  CardItem,
  Content,
  Left,
  Text,
  Toast,
} from 'native-base';
import { NEWS_API_KEY } from '../constants';
import { Article } from '../types';
import axios from 'axios';
import { Linking } from 'react-native';
import moment from 'moment';

const processTitle = (titleWithSource: string) => {
  const sep = titleWithSource.lastIndexOf('-');
  const title = titleWithSource.substr(
    0,
    sep - 1 // remove " -" from title
  );

  // remove "- " from source
  const source = titleWithSource.substr(sep + 2);

  return [source, title];
};

const fetchTopHeadlines = async (
  setNewsArticles: (articles: Article[]) => void
) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );
    setNewsArticles(response.data.articles);
  } catch (error) {
    console.error(error);
    Toast.show({
      buttonText: 'OK',
      duration: 3000,
      text: 'Failed to load articles.',
    });
  }
};

const navigateToArticle = (url: string) => {
  try {
    Linking.openURL(url);
  } catch (error) {
    console.error(error);
    Toast.show({
      buttonText: 'OK',
      duration: 3000,
      text: 'Unable to view article.',
    });
  }
};

export default () => {
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchTopHeadlines(setNewsArticles);
  }, []);

  return (
    <Content padder>
      {newsArticles.map(article => {
        const [source, title] = processTitle(article.title);

        return (
          <Card
            key={article.url}
            style={{ marginBottom: 15, marginLeft: 15, marginRight: 15 }}
          >
            <CardItem>
              <Left>
                <Body>
                  <Text>{source}</Text>
                  <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                  <Text style={{ marginBottom: 10, fontSize: 12 }}>
                    {moment(article.publishedAt).format(
                      'MMM D YYYY, h:mm:ss a'
                    )}
                  </Text>

                  <Text style={{ marginBottom: 10 }}>
                    {article.description}
                  </Text>
                  <Button
                    color="#34baeb"
                    transparent
                    style={{ marginLeft: 0 }}
                    onPress={() => navigateToArticle(article.url)}
                  >
                    <Text style={{ paddingLeft: 0 }}>Full Article</Text>
                  </Button>
                </Body>
              </Left>
            </CardItem>
          </Card>
        );
      })}
    </Content>
  );
};
