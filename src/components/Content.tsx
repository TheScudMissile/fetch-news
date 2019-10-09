import React, { useCallback, useEffect, useState } from 'React';
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
import { Image, Linking, RefreshControl } from 'react-native';
import moment from 'moment';

/**
 * Handles splitting the article title from its source
 * @param titleWithSource title string returned by NewsApi is formatted like: "Title - Source"
 */
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

/**
 * Fetches the current top headlines from all possible sources
 * @param setNewsArticles function to update article state
 */
const fetchTopHeadlines = async (
  setNewsArticles: (articles: Article[]) => void
) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );
    setNewsArticles(response.data.articles);
  } catch (error) {
    Toast.show({
      buttonText: 'OK',
      duration: 3000,
      text: 'Failed to load articles.',
    });
  }
};

/**
 * Opens the article in a browser at the specified url
 * @param url
 */
const navigateToArticle = (url: string) => {
  try {
    Linking.openURL(url);
  } catch (error) {
    Toast.show({
      buttonText: 'OK',
      duration: 3000,
      text: 'Unable to view article.',
    });
  }
};

export default () => {
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  // Called when user pulls down on the scroll view
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchTopHeadlines(setNewsArticles);
    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshing]);

  useEffect(() => {
    fetchTopHeadlines(setNewsArticles);
  }, []);

  return (
    <Content
      padder
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {newsArticles.map(article => {
        const [source, title] = processTitle(article.title);
        return (
          <Card
            key={article.url}
            style={{ marginBottom: 15, marginLeft: 15, marginRight: 15 }}
          >
            <CardItem header bordered>
              <Left>
                <Body>
                  <Text>{source}</Text>
                  <Text note>
                    {moment(article.publishedAt).format(
                      'MMM D YYYY, h:mm:ss a'
                    )}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{ uri: article.urlToImage }}
                  style={{
                    height: 200,
                    width: '100%',
                  }}
                />
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
                  {title}
                </Text>
                <Text>{article.description}</Text>
                <Button
                  color="#34baeb"
                  transparent
                  onPress={() => navigateToArticle(article.url)}
                >
                  <Text style={{ paddingLeft: 0 }}>Full Article</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        );
      })}
    </Content>
  );
};
